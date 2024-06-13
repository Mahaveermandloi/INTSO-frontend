import React, { useEffect, useState } from "react";

import ImagesCard from "./ImagesCard";
import PdfCard from "./PdfCard";
import VideosCard from "./VideosCard";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";
import useFetchKnowledgeData from "../utils/hooks/useFetchKnowledgeData";

const fetchResources = async (searchInput) => {
  const response = await fetch(
    ` http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-all-resources?searchTerm=${searchInput}&resource_class=`
  );
  const data = await response.json();
  // console.log(data.data.resourcesData);
  return data.data.resourcesData;
};

const filterUnpaidResources = (resources) => {
  return resources.filter((resource) => !resource.is_paid);
};

const separateByResourceType = (resources) => {
  return resources.reduce((acc, resource) => {
    const { resource_type } = resource;
    if (!acc[resource_type]) {
      acc[resource_type] = [];
    }
    acc[resource_type].push(resource);
    return acc;
  }, {});
};

const ResourceList = ({ searchInput, selectedOption }) => {
  const {
    data1: imageArray,
    data2: pdfArray,
    data3: videoArray,
    loading,
  } = useFetchKnowledgeData({ searchInput, selectedOption });

  const [resources, setResources] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchResources(searchInput);
  //       const unpaidResources = filterUnpaidResources(data);
  //       const separatedResources = separateByResourceType(unpaidResources);
  //       setResources(separatedResources);
  //     } catch (error) {
  //       console.error("Error fetching resources:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [searchInput]);

  return (
    <>
      <div>
        <ImagesCard resources={imageArray} />
        <PdfCard resources={pdfArray} />
        <VideosCard resources={videoArray} />
      </div>
    </>
  );
};

export default ResourceList;
