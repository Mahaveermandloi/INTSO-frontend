import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { URLPath, baseURL } from "../URLPath";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import Loader from "./Loader"; // Import Loader component
import img from "../assets/9214833.jpg";

const Blog = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const fetchGallery = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.get(
          `${URLPath}/api/v1/blogs/get-all-blog-details`,
          {
            headers: {
              api_key: "ajeet",
            },
          }
        );
        // console.log(response.data.data.blogData);
        setGallery(response.data.data.blogData);
      } else {
        console.error("No access token found");
      }
    } catch (error) {
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {isLoading && <Loader message="Loading blogs..." />}
      <div className="lg:w-10/12 lg:ml-auto">
        <div className="flex justify-between items-center">
          <div className="flex justify-between w-full items-center">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold">Blogs</h1>
            </div>

            <div>
              <button
                onClick={() => {
                  navigate(`${baseURL}/createblog`);
                }}
                className="w-full text-white bg-[#ed1450] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-5">
          {gallery.length === 0 ? (
            <>
              <img src={img} alt="" className="w-full" />
            </>
          ) : (
            gallery.map(
              ({ id, image, description, createdAt, posted_By, title }) => (
                <BlogBox
                  key={id}
                  id={id}
                  image={image}
                  description={description}
                  createdAt={createdAt}
                  title={title}
                  posted_By={posted_By}
                />
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;

const BlogBox = ({ id, image, description, title, createdAt, posted_By }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    let isConfirmed = false;

    const confirmDeletion = () => {
      isConfirmed = true;
      toast.dismiss(confirmationToastId);
    };

    const confirmationToastId = toast.info(
      "Are you sure you want to delete the blog?",
      {
        autoClose: 5000,
        closeOnClick: false,
        draggable: false,
        onClose: () => {
          toast.dismiss(confirmationToastId);
        },
        closeButton: (
          <button
            onClick={confirmDeletion}
            className="bg-blue-400 p-2 text-white rounded-lg h-10 ml-4 mt-3"
          >
            Confirm
          </button>
        ),
      }
    );

    while (!isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (isConfirmed) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${URLPath}/api/v1/blogs/delete-blogs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("BLOG deleted successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        toast.error("Error deleting blog", error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
      }
    }
  };

  const handleEdit = () => {
    navigate(`${baseURL}/updateblog/${id}`);
  };

  return (
    <div
      key={id}
      className="mb-4 border-2 border-gray-200 rounded-lg p-5 space-y-1 shadow-xl"
    >
      <img src={`${URLPath}${image}`} alt="" className="w-full" />
      <h3 className="text-md font-semibold">{title}</h3>
      <p>{description}</p>
      <div className="flex justify-between font-bold">
        <p>{createdAt}</p>
        <p className="text-[#ed1450]">{posted_By}</p>
      </div>
      <div className="flex gap-3">
        <button
          className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-red-800 rounded-full"
          onClick={() => handleDelete(id)}
        >
          <RxCross1 className="p-1" size={30} />
        </button>
        <button
          className="text-white p-1 mt-4 bg-[#ed1450] hover:bg-green-500 rounded-full"
          onClick={handleEdit}
        >
          <MdModeEdit className="p-1" size={30} />
        </button>
      </div>
    </div>
  );
};
