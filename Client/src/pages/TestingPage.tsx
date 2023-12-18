import { useEffect, useState } from "react";
import CommentModel from "../models/CommentModel";
import useCommentModel from "../hooks/useCommentModel";
const TestingPage = () => {
  const loginModel = useCommentModel();
  
  
  return (
    <>
      {/* <CommentModel  BlogId={"657d45fcde1577882c27ca62"}/> */}
      <div className=" h-screen w-full">
        <button onClick={() => loginModel.onOpen()} className=" h-10 w-10 ">
          Open
        </button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          obcaecati sunt ex a reprehenderit recusandae at deleniti tempore
          sapiente? Rerum minima aperiam impedit nisi! Enim aut expedita
          reiciendis ipsum fugiat ipsa consectetur voluptate totam magni tenetur
          sit repellendus atque numquam id laboriosam porro magnam facere
          corporis quidem asperiores beatae, assumenda hic dolorum earum!
          Molestiae nostrum nisi error excepturi enim distinctio? Aperiam
          facilis ratione quam natus illo in. Molestiae nulla, laboriosam
          consectetur, numquam eos optio inventore praesentium ullam repudiandae
          corrupti eum et similique cumque natus amet, iste quas voluptatibus
          quisquam esse accusantium quo hic modi. Commodi distinctio voluptatum
          obcaecati modi deserunt debitis asperiores dolores in accusantium
          minus, consequuntur eos ipsa dignissimos eveniet. Quasi repellendus
          enim magnam mollitia reiciendis nulla nisi facilis et quaerat
          aspernatur, laborum perferendis tenetur cum repudiandae eius id ipsum
          quia! Sunt, eaque sit. Cumque, delectus. Pariatur quidem dolorum dolor
          temporibus beatae? Quibusdam laboriosam in impedit atque veniam, illo
          optio consequatur, maiores vitae quidem assumenda laudantium
          exercitationem reprehenderit amet, adipisci architecto. Aut aliquam
          perspiciatis fuga aspernatur provident! Voluptatem atque a autem id,
          esse magnam recusandae, dolor doloremque repellendus dolore
          reiciendis, aperiam nemo repellat praesentium voluptas qui facilis.
          Eos commodi dolorum labore voluptatum a eaque sequi, dolore ipsa
          corporis ratione ipsam odio blanditiis dolorem reprehenderit
          consequuntur, delectus numquam quod provident, quae molestiae. Quae
          minus animi fugit voluptas sed cum, quisquam optio quia voluptatum
          maxime vitae quam laboriosam, nesciunt non nisi adipisci sunt mollitia
          deserunt minima consequatur architecto reprehenderit commodi.
          Voluptatem veritatis consequuntur quisquam odio veniam aperiam harum
          reprehenderit earum error maxime at nihil cumque, quasi amet autem
          delectus ullam non labore quia. Eum corporis nostrum laboriosam
          quisquam error inventore doloremque, tenetur ullam nam doloribus culpa
          reiciendis placeat similique perferendis, quod impedit! Illum
          consectetur explicabo animi non nesciunt? Consequuntur velit autem
          dolorum reiciendis quam maiores dolor. Accusantium doloribus vitae
          libero reprehenderit cum rem vero, sint placeat dolorem facere qui
          dolor deleniti est, veniam deserunt at explicabo aperiam quis error
          voluptatum perferendis ipsa? Nostrum sequi eius laboriosam autem,
          cupiditate, ex modi officia saepe aliquid culpa vel nulla nobis sunt,
          nam ipsum? Explicabo numquam, nostrum dolorum cumque nisi ducimus
          atque voluptatibus, aperiam fuga eius doloribus consectetur veniam
          minima sit! Corporis quidem sed maxime officiis harum obcaecati.
          Natus, doloribus. Blanditiis, temporibus corporis. Pariatur omnis
          consequatur facilis commodi, earum similique fugiat aut veniam aliquam
          illum quam nisi quod, aspernatur esse odio voluptates nesciunt autem
          perspiciatis eum, voluptas eligendi accusamus. Magnam deleniti quam
          laudantium nemo repellendus vitae. Eos sequi quibusdam explicabo,
          aspernatur nihil corrupti qui, rerum, nam architecto beatae minima
          numquam expedita. Nemo, minima assumenda sit pariatur id iusto hic
          odit harum sed aliquid laborum, fuga quas totam magni animi ducimus
          vero nobis. Error quo rem, eligendi eveniet nostrum beatae ab
          exercitationem fugiat possimus nesciunt dolor ea expedita in? Pariatur
          perferendis commodi illo officia. Provident nobis hic, eos, laborum
          tempore, voluptatibus minima eligendi a recusandae voluptate qui
          voluptas laboriosam. Hic quidem similique neque consequatur nostrum ut
          necessitatibus, inventore, iusto eius autem adipisci ex! Nisi,
          voluptate nihil ea quae amet voluptas, rerum eius excepturi tempora
          praesentium temporibus commodi fugit adipisci saepe iste harum id
          repellat ex? Sit quis nesciunt magnam quos ab quaerat consequuntur
          facere architecto corrupti repellat fuga saepe omnis error deleniti,
          iusto eveniet consectetur, velit sint, cupiditate rerum non? Sapiente
          nesciunt, soluta aliquam id distinctio doloremque animi porro nisi
          quia? Corporis ex quos accusantium laudantium ullam fugit corrupti
          saepe laboriosam quo, porro nemo eos quas ea, veritatis non debitis
          facere dolores maxime atque reprehenderit sint sunt tempore distinctio
          laborum? Corporis labore voluptas mollitia quaerat praesentium facere
          ea error sed! Amet vel reiciendis, tenetur obcaecati nam optio soluta
          eum voluptatibus quia architecto consequatur earum tempore quis ipsum
          sunt cupiditate quae illum magnam repudiandae in fugit eveniet ab
          debitis aperiam. Pariatur sed velit consequuntur et aspernatur
          explicabo veritatis officia quam quo totam? Optio facere quibusdam
          consequuntur, vero eligendi unde et? Harum consequuntur eius, dolore
          cupiditate impedit ipsa ducimus debitis quod praesentium
          necessitatibus, eveniet fugiat laboriosam? Repellendus nam ipsam iste
          placeat provident quam aperiam error laborum natus reiciendis adipisci
          cum sapiente dolor blanditiis ab ad quaerat exercitationem totam
          molestias optio assumenda, aspernatur impedit! Reprehenderit, ea.
          Eaque tenetur omnis eius nulla eos minus facilis porro dicta, vitae
          ducimus veniam maxime temporibus. Magnam quod quasi perspiciatis
          pariatur praesentium, vitae voluptate rem assumenda fugit saepe! Quo
          corporis mollitia quae saepe illo esse optio molestiae. Ab officia
          fuga ut totam voluptatum distinctio amet, aspernatur voluptates?
          Voluptatibus, mollitia reprehenderit. Reiciendis consectetur
          temporibus debitis itaque delectus iure, ex in. Provident voluptate
          vel suscipit quaerat praesentium cumque atque eligendi fugit eius
          voluptas et, culpa aliquam sit voluptatibus ratione pariatur ex velit,
          maxime nisi est. Cum eos asperiores quos et, deleniti id quidem earum
          maxime nam eum quisquam voluptatum velit! Natus obcaecati quis in
          repudiandae ut consectetur dolor, iusto soluta id autem necessitatibus
          illo excepturi rem doloribus, porro nam alias. Consectetur officia
          placeat itaque ratione saepe!
        </p>
      </div>
    </>
  );
};

export default TestingPage;
