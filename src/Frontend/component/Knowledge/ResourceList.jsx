import React, { useEffect, useState } from "react";

import ImagesCard from "./ImagesCard";
import PdfCard from "./PdfCard";
import VideosCard from "./VideosCard";
import { IP_ADDRESS, PORT } from "../utils/constants";
import Spinner1 from "../common files/Spinner1";

const fetchResources = async () => {
  const response = await fetch(
    `http://${IP_ADDRESS}:${PORT}/api/v1/resource/get-all-resources`
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

const ResourceList = () => {
  const [resources, setResources] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResources();
        const unpaidResources = filterUnpaidResources(data);
        const separatedResources = separateByResourceType(unpaidResources);
        setResources(separatedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ImagesCard resources={resources.image || []} />
      <PdfCard resources={resources.pdf || []} />
      <VideosCard resources={resources.video || []} />
    </div>
  );
};

export default ResourceList;
