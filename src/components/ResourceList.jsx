import React from "react";
import { useSelector } from "react-redux";
import Resource from "./Resource";
import { selectResources } from "../state/catalogSlice";
import Accordion from 'react-bootstrap/Accordion';

const ResourceList = () => {
  const resources = useSelector( selectResources );

  if( resources.length == 0){
    return(
      <div className="fw-bold">
        No Resources Match Your Filters
      </div>
    )
  }

  return (
    <div>
      <h4 className="mb-0">Resources</h4>
      <Accordion>
        { resources.map((r) =>
          <Resource resource={r} key={r.resourceId} />
        )}
      </Accordion>
    </div>
  );
}

export default ResourceList;