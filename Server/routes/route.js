const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userSchema");
const Blog = require("../models/blogScheme");
const Comment = require("../models/commentSchema");
const Like = require("../models/likeSchema");
const multer = require("multer");
const path = require("path");
const { createTokenForUser } = require("../services/authJwt");
const authenticate = require("../middleware/authentication");
const cookieParser = require("cookie-parser");
const { trace } = require("console");
router.use(cookieParser());

const Server = process.env.SERVER_ADDRESS;

const storageProfilePic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads/profilePic/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadProfilePic = multer({ storage: storageProfilePic });

const storageCoverImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads/blogPic/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadCoverImage = multer({ storage: storageCoverImage });

router.post(
  "/signup",
  uploadProfilePic.single("profileImage"),
  async (req, res) => {
    const { username, email, password, cpassword, about } = req.body;

    if (!username || !email || !password || !cpassword) {
      return res.status(422).json({ message: "Please fill all details" });
    }

    try {
      const userExistUsername = await User.findOne({ username: username });
      if (userExistUsername) {
        res
          .status(422)
          .json({ message: "User already exist with this username" });
      } else {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
          res
            .status(422)
            .json({ message: "User already exist with this email" });
        } else if (password !== cpassword) {
          return res
            .status(422)
            .json({ message: "Both passwords do not matched" });
        } else {
          if (req.file) {
            profile_img_url = `${Server}/uploads/profilePic/${req.file.filename}`; // Save the path to the uploaded file
          } else {
            profile_img_url = `${Server}/uploads/profilePic/defProfilePic.png`; // Set your default value
          }

          const user = new User({
            username,
            email,
            password,
            cpassword,
            profile_img_url,
            about,
          });

          user.password = await bcrypt.hash(user.password, 12);
          user.cpassword = await bcrypt.hash(user.cpassword, 12);
          user.save();

          res.status(200).json({ message: "User Created" });
        }
      }
    } catch (error) {
      res.status(422).json({ message: "Something went wrong" });
    }
  }
);

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ message: "Please fill credentials" });
  }
  try {
    const userValidate = await User.findOne({ email: email });

    if (userValidate) {
      const isMatched = bcrypt.compareSync(password, userValidate.password);
      if (isMatched) {
        const token = createTokenForUser(userValidate);

        res
          .cookie("jwtoken", token, {
            expires: new Date(Date.now() + 172800000),
            httpOnly: true,

            secure: false,
          })
          .status(200)
          .json({ message: "Login Succesfully" });
      } else res.status(422).json({ message: "Invalid Credentials" });
    } else res.status(422).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(422).json({ message: "Something went wrong" });
  }
});

router.get("/verifyuser", authenticate, (req, res) => {
  const data = req.data;
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(401).json(null);
  }
});

router.get("/aboutus", authenticate, (req, res) => {
  res.status(200).json(req.data);
});

router.get("/home", authenticate, (req, res) => {
  res.status(200).json(req.data);
});

router.get("/logout", (req, res) => {
  res.status(200).clearCookie("jwtoken").json({ logout: "True" });
});

router.post("/viewblog", authenticate, async (req, res) => {
  const data = req.data;
  const { id } = req.body;

  if (data) {
    try {
      if (id) {
        const query = await Blog.findById(id).populate({
          path: "authorId",
          select: "username profile_img_url ",
        });
        // console.log("que",query);
        if (query) {
          const comment = await Comment.find({ blogId: query._id });
          // console.log("Comment",comment.length);
          const Clength = comment.length;
          res.status(200).json({ query, Clength });
        } else {
          res.status(422).json({ message: "Blog not found" });
        }
      } else {
        res.status(422).json({ message: "Something went wrong" });
      }
    } catch (error) {
      res.status(422).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Access Denied" });
  }
});

router.post(
  "/post-blog",
  authenticate,
  uploadCoverImage.single("coverImage"),
  (req, res) => {
    const { title, body, category_name, subheading } = req.body;

    // console.log(body);
    const authorId = req.data.id;
    try {
      if ((title && body && category_name, subheading)) {
        // console.log(req.file);
        if (req.file) {
          cover_photo_url = `${Server}/uploads/blogPic/${req.file.filename}`;
        } else {
          cover_photo_url = null;
        }
        // console.log(req.body);
        const blog = new Blog({
          title,
          body,
          category_name,
          authorId,
          cover_photo_url,
          subheading,
        });

        blog.save();
        res.status(200).json({ message: "Uploaded Succesfully" });
      } else {
        res.status(422).json({ message: "Please fill all the details" });
      }
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
);

router.put(
  "/updateProfile",
  authenticate,
  uploadProfilePic.single("profileImage"),
  async (req, res) => {
    const data = req.data;
    const { exp } = data;
    const id = data.id;
    const { type } = req.body;
    
    if (data != null) {
      if (type == "delete") {
        try {
          const deleteUser = await User.findByIdAndDelete(id);
          if (deleteUser) {
            await Blog.deleteMany({ authorId: id });
            res.status(200).json({ message: "Updated Succesfully" });
          } else {
            res.status(422).json({ message: "Updation failed" });
          }
        } catch (error) {
          res.status(400).json({ message: "Something went wrong" });
        }
      } else if (type == "password") {
        const { ppassword, password, cpassword } = req.body;

        try {
          const userExist = await User.findById(id);
          if (userExist) {
            if (ppassword && password && cpassword) {
              const isMatched = bcrypt.compareSync(
                ppassword,
                userExist.password
              );
              if (isMatched) {
                if (ppassword !== password) {
                  if (password === cpassword) {
                    const passwordHashed = await bcrypt.hash(password, 12);
                    const cpasswordHashed = await bcrypt.hash(cpassword, 12);

                    const updatedUser = await User.findByIdAndUpdate(
                      id,
                      { password: passwordHashed, cpassword: cpasswordHashed },
                      { new: true }
                    );

                    res.status(200).json({ message: "Updated Succesfully" });
                  } else {
                    res
                      .status(422)
                      .json({ message: "Both passwords do not matched" });
                  }
                } else {
                  res.status(422).json({
                    message: "Old and new password can't be same",
                  });
                }
              } else {
                res.status(401).json({ message: "Invalid password" });
              }
            } else {
              res.status(422).json({ message: "Please fill all Details" });
            }
            // res.status(200).json({ message: "Access granted" });
          } else {
            res.status(403).json({ message: "Access Denied" });
          }
        } catch (error) {}
      } else if (type == "profileImage") {
        if (req.file) {
          const input = `${Server}/uploads/profilePic/${req.file.filename}`;
          try {
            const updatedUser = await User.findByIdAndUpdate(
              id,
              { profile_img_url: input },
              { new: true }
            );
            const token = createTokenForUser(updatedUser);
            res
              .status(200)
              .cookie("jwtoken", token, {
                expires: new Date(exp * 1000),
                httpOnly: true,
                secure: false,
              })
              .json({ message: "Updated Succesfully" });
          } catch (error) {
            res.status(422).json({ message: "Something went wrong" });
          }
        } else {
          res.status(422).json({ message: "Please provide a image" });
        }
      } else {
        const { type, input } = req.body;
        if (type && input) {
          try {
            const userExist = await User.findOne({ [type]: input });

            if (userExist) {
              if (type == "about") {
                res.status(422).json({ message: "Please enter new content" });
              } else {
                res.status(422).json({ message: "User already exist" });
              }
            } else {
              const updatedUser = await User.findByIdAndUpdate(
                id,
                { [type]: input },
                { new: true }
              );
              
              const token = createTokenForUser(updatedUser);
              res
                .status(200)
                .cookie("jwtoken", token, {
                  expires: new Date(Date.now() + 172800000),
                  httpOnly: true,
                  secure: false,
                })
                .json({ message: "Updated Succesfully" });
            }
          } catch (error) {
            res.status(422).json({ message: "Something went wrong" });
          }
        } else {
          res.status(422).json({ message: "Please fill all Details" });
        }
      }
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  }
);

router.delete("/delete-blog", authenticate, async (req, res) => {
  const data = req.data;
  const { _id } = req.body;

  if (data) {
    if (_id) {
      try {
        const check = await Blog.findOneAndDelete({
          authorId: data.id,
          _id: _id,
        });
        if (check) {
          res.status(200).json({ message: "Deleted succesfully" });
        } else {
          res.status(422).json({ message: "Blog not found" });
        }
      } catch (error) {}
    } else {
      res.status(422).json({ message: "Please fill all Details" });
    }
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
});

router.post("/userProfile", authenticate, async (req, res) => {
  const { username } = req.body;
  const data = req.data;

  try {
    const user = await User.findOne(
      { username: username },
      "username about profile_img_url createdAt"
    );
    if (user) {
      const blog = await Blog.find({ authorId: user._id }).populate({
        path: "authorId",
        select: " createdAt", // Specify the fields to select from the populated 'user'
      });
      if (data) {
        if (user.username === data.username) {
          res.status(200).json({
            currentUser: data,
            user: user,
            blog: blog,
            isMatched: true,
          });
        } else {
          res.status(200).json({
            currentUser: data,
            user: user,
            blog: blog,
            isMatched: false,
          });
        }
      } else {
        res.status(403).json({ message: "Access Denied" });
      }
    } else {
      res.status(422).json(data);
    }
  } catch (error) {
    res.status(422).json({ message: error });
  }
});

router.get("/get-likes/:_id",  async(req,res) => {
  const {_id} = req.params;
  try {
    if (_id) {
      const data = await Like.find({ blogId: _id });
      const likes = data.length;
      if (likes !== 0) {
        res.status(200).json(likes);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "Please fill all details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

})

router.post("/post-like", authenticate, async (req, res) => {
  const { blogId  } = req.body;
  
  if(req.data){
    const authorId = req.data.id;
  if (blogId) {
      try {
        const blogAuth = await Blog.findById({ _id: blogId });
        if (blogAuth) {
          const checkLikeOneTime = await Like.find({blogId:blogId,authorId:authorId});
           
          if(checkLikeOneTime.length != 0){
            res.status(400).json({message:"Not allowed"});
          }else{
            const data = new Like({
              authorId,
              blogId,
            });
            data.save();
            res.status(200).json({ message: "Updated Succesfully" });
          }
        } else {
          res.status(400).json({ message: "Blog not found" });
        }
      } catch (error) {
        
        res.status(500).json({ message: "Internal Server Error" });
      }
    
  } else {
    res.status(400).json({ message: "Please fill all details" });
  }
  }else{
    res.status(401).json({ message: "Access Denied" });
 
  }
});

router.post("/post-comment", authenticate, async (req, res) => {
  const { body, blogId, authorId } = req.body;
  const auth = req.data.id;
  if (body && blogId && authorId) {
    if (auth == authorId) {
      try {
        const blogAuth = await Blog.findById({ _id: blogId });
        if (blogAuth) {
          const comment = new Comment({
            authorId,
            blogId,
            body,
          });
          comment.save();
          res.status(200).json({ message: "Updated Succesfully" });
        } else {
          res.status(400).json({ message: "Blog not found" });
        }
      } catch (error) {
        
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  } else {
    res.status(400).json({ message: "Please fill all details" });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    if (query) {
      const data = await Blog.find({
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { category_name: { $regex: new RegExp(query, 'i') } },
        ],
       }).populate({
        path: "authorId",
        select: "username profile_img_url ",
      });
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "Please fill all details" });
    }
  } catch {}
});

router.get("/get-comments/:BlogId", async (req, res) => {
  const { BlogId } = req.params;
  try {
    if (BlogId) {
      const data = await Comment.find({ blogId: BlogId }).populate({
        path: "authorId",
        select: "username profile_img_url ",
      });
      
      if (data.length !== 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "Please fill all details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-blog/:category", async (req, res) => {
  const { category } = req.params;

  try {
    let query;
    if (category === "forYou") {
      const data = await Blog.find({}).populate({
        path: "authorId",
        select: "username profile_img_url ",
      });

      res.status(200).json(data);
    } else {
      query = { category_name: category };
      // console.log(query);
      const data = await Blog.find(query).populate({
        path: "authorId",
        select: "username profile_img_url ",
      });

      if (data == []) {
        res.status(400).json({ message: "No blog found" });
      } else {
        res.status(200).json(data);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
