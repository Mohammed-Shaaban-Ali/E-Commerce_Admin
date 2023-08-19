import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../redux/slices/categorySlice";
import { deleteImg, uploadImg } from "../../redux/slices/uploadSlice";
import { toast } from "react-toastify";
import { addBlogs, resetState } from "../../redux/slices/blogSlice";

let userSchema = object().shape({
  title: string().required(),
  description: string().required(),
  category: string().required(),
});
const AddBlog = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.productCategory);
  const { images } = useSelector((state) => state.upload);
  const { isError, isLoading, isSuccess, createdBlog } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(getcategory());
  }, [images]);

  useEffect(() => {
    if (isSuccess && createdBlog) toast.success("Blog added successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const imagesData = [];
  images?.forEach((element) => {
    imagesData.push({
      public_id: element.public_id,
      url: element.url,
    });
  });
  useEffect(() => {
    formik.values.images = imagesData;
  }, [imagesData]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Blog</h3>

        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-2"
          >
            <div className="mt-4">
              <CustomInput
                type="text"
                label="Enter product title"
                name="title"
                id="title"
                onChange={formik.handleChange("title")}
                value={formik.values.title}
              />
              <div className="error">
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
              </div>
            </div>

            <select
              className="form-control py-2 "
              name="category"
              id="category"
              onChange={formik.handleChange("category")}
              value={formik.values.category}
            >
              <option disabled value="">
                Select category
              </option>
              {categories?.map((i, indx) => (
                <option key={indx} value={i.title}>
                  {i.title}
                </option>
              ))}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
              ) : null}
            </div>

            <div>
              <ReactQuill
                style={{ minHeight: "200px" }}
                theme="snow"
                placeholder="Enter product description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="bg-white text-center p-5 border-1">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showImages d-flex flex-wrap gap-3">
              {images?.map((img, index) => (
                <div className="position-relative" key={index}>
                  <button
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => dispatch(deleteImg(img.public_id))}
                  ></button>
                  <img src={img.url} alt={img.url} width={200} height={200} />
                </div>
              ))}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-4">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
