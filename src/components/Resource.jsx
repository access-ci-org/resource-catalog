import React from "react";
import Accordion from "react-bootstrap/Accordion";
const Resource = ({ resource }) => {

  const renderFeatures = (features) => {
      if(features.length == 0){
        return "";
      }

      return (
        <ul>
          {features.map((f, i) =>
            <li key={`feature_${resource.resourceId}_${i}`}>{f}</li>
          )}
        </ul>
      );
  }

  const renderDescription = (title, content) => {
    if(content && content != "") {
      return(
        <>
          <div className="row">
            <div className="col fw-bold">
              {title}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              { content  }
            </div>
          </div>
        </>
      )
    }
    return "";
  }

  return(
    <Accordion.Item eventKey={resource.resourceId}>
      <Accordion.Header>
        {resource.resourceName}
      </Accordion.Header>
      <Accordion.Body>
        <table className="table">
          <tbody>
            <tr>
              <td>Resource Type:</td>
              <td>{ resource.resourceType }</td>
            </tr>
            <tr>
              <td>Organization:</td>
              <td>{ resource.organization }</td>
            </tr>
            <tr>
              <td>Units:</td>
              <td>{ resource.units }</td>
            </tr>
            <tr>
              <td>User Guide:</td>
              <td>
                {resource.userGuideUrl == "" ? "" :
                  <a href={resource.userGuideUrl} target="_blank" rel="noreferrer">
                    Link to User Guide
                  </a>
                }
              </td>
            </tr>
            <tr>
              <td>Features Available:</td>
              <td>
                { renderFeatures(resource.features) }
              </td>
            </tr>
          </tbody>
        </table>
        { renderDescription('Resource Description', resource.resourceDescription)}
        { renderDescription('Allocations Description', resource.description) }
        { renderDescription('Recommended Use', resource.recommendedUse) }
      </Accordion.Body>
    </Accordion.Item>

  )
}

export default Resource;