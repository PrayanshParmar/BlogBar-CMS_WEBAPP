import { useState, useEffect } from "react";
import Accordian from "./Accordian";

interface AccordianFeedProps{
    type: string,
    accordionHeaderTitle: string,
    accordionHeaderContent: string
}

interface AccordianFeedData {
    accordianFeedData: AccordianFeedProps[];
  }

const AccordianFeed:React.FC<AccordianFeedData>  = ({
    accordianFeedData
}) => {
    const [data, setData] = useState<AccordianFeedProps[]>([]);  

    useEffect(() => {
        // Use the provided blogData to set the state
        try {
          setData(accordianFeedData);
        } catch (error) {
        }
      }, [accordianFeedData]);
  return (
    <>
      <div id="AccordianFeed" className="h-full  md:mx-6">
      {data.map((item, index) => (
        <Accordian key={index} type={item.type} accordionHeaderTitle={item.accordionHeaderTitle} accordionHeaderContent={item.accordionHeaderContent} />
      ))}
        
      </div>
    </>
  );
};

export default AccordianFeed;
