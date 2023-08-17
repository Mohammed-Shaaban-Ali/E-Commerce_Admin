import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Multiselect from "react-widgets/Multiselect";
import Dropzone from "react-dropzone";

import { useFormik } from "formik";
import { number, object, string } from "yup";
import { getbrands } from "../../redux/slices/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../redux/slices/categorySlice";
import { getcolors } from "../../redux/slices/colorSlice";
import { deleteImg, uploadImg } from "../../redux/slices/uploadSlice";
import { addProduct } from "../../redux/slices/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [ColorsList, setColorsList] = useState([]);
  const [imagesList, setimagesList] = useState([]);

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.colors);
  const { images } = useSelector((state) => state.upload);

  useEffect(() => {
    dispatch(getbrands());
    dispatch(getcategory());
    dispatch(getcolors());
  }, [images]);

  const ColorsData = [];
  colors?.forEach((element) => {
    ColorsData.push({
      id: element._id,
      color: element.title,
    });
  });
  const imagesData = [];
  images?.forEach((element) => {
    imagesData.push({
      public_id: element.public_id,
      url: element.url,
    });
  });
  useEffect(() => {
    formik.values.color = ColorsList;
    formik.values.images = imagesData;
  }, [ColorsList, imagesList]);

  let userSchema = object({
    title: string().required(),
    description: string().required(),
    price: number().required(),
    quantity: number().required(),
    brand: string().required(),
    category: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      color: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addProduct(values));
    },
  });

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Product</h3>

        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-2"
          >
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
            <CustomInput
              type="number"
              label="Enter product price"
              name="price"
              id="price"
              onChange={formik.handleChange("price")}
              value={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price ? (
                <div>{formik.errors.price}</div>
              ) : null}
            </div>
            <select
              className="form-control py-2 "
              name="brand"
              id="brand"
              onChange={formik.handleChange("brand")}
              value={formik.values.brand}
            >
              <option value="">Select Brand</option>
              {brands?.map((i, indx) => (
                <option key={indx} value={i.title}>
                  {i.title}
                </option>
              ))}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand ? (
                <div>{formik.errors.brand}</div>
              ) : null}
            </div>
            <select
              className="form-control py-2 "
              name="category"
              id="category"
              onChange={formik.handleChange("category")}
              value={formik.values.category}
            >
              <option value="">Select category</option>
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
            <Multiselect
              dataKey="id"
              textField="color"
              placeholder="Choose a color"
              data={ColorsData}
              onChange={(e) => setColorsList(e)}
            />

            <CustomInput
              type="number"
              label="Enter product quantity"
              name="quantity"
              id="quantity"
              onChange={formik.handleChange("quantity")}
              value={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity ? (
                <div>{formik.errors.quantity}</div>
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
            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-4"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
