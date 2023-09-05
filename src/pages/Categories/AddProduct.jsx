import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { Select } from "antd";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { getbrands } from "../../redux/slices/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../redux/slices/categorySlice";
import { getcolors } from "../../redux/slices/colorSlice";
import { deleteImg, uploadImg } from "../../redux/slices/uploadSlice";
import { addProduct, resetState } from "../../redux/slices/productSlice";
import { toast } from "react-toastify";
import Reloader from "../../components/Reloader";

let userSchema = object().shape({
  title: string().required(),
  description: string().required(),
  price: number().required(),
  quantity: number().required(),
  brand: string().required(),
  category: string().required(),
  tags: string().required(),
  color: array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
});
const AddProduct = () => {
  const dispatch = useDispatch();

  const [color, setColor] = useState([]);

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.colors);
  const img = useSelector((state) => state.upload.images);
  const imagesisLoading = useSelector((state) => state.upload.isLoading);
  const { isError, isLoading, isSuccess, createdProduct } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getbrands());
    dispatch(getcategory());
    dispatch(getcolors());
  }, [img]);

  useEffect(() => {
    if (isSuccess && createdProduct)
      toast.success("Product added successfully");

    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const coloropt = [];
  colors.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const imagesData = [];
  img?.forEach((element) => {
    imagesData.push({
      public_id: element.public_id,
      url: element.url,
    });
  });
  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = imagesData;
  }, [color, imagesData]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      quantity: "",
      color: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addProduct(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Product</h3>
        {isLoading ? (
          <Reloader />
        ) : (
          <div>
            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-4"
            >
              <div style={{ gap: "30px" }} className="d-flex ">
                <div className="w-auto flex-grow-1">
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
                <div className="w-auto  flex-grow-1">
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
                </div>
                <div className="w-auto  flex-grow-1">
                  <CustomInput
                    // iclass="w-50 flex-grow-1"
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
                </div>
              </div>

              <div style={{ gap: "30px" }} className="d-flex ">
                <div className="w-50 flex-grow-1">
                  <select
                    className="form-control py-2 "
                    name="brand"
                    id="brand"
                    onChange={formik.handleChange("brand")}
                    value={formik.values.brand}
                  >
                    <option disabled value="">
                      Select Brand
                    </option>
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
                </div>
                <div className="w-50 flex-grow-1">
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
                </div>
              </div>
              <div style={{ gap: "30px" }} className="d-flex ">
                <div className="w-50 flex-grow-1">
                  <select
                    className="form-control py-2 "
                    name="tags"
                    id="tags"
                    onChange={formik.handleChange("tags")}
                    value={formik.values.tags}
                  >
                    <option disabled value="">
                      Select tags
                    </option>
                    <option value="featured">Featured</option>
                    <option value="popular">Popular</option>
                    <option value="special">Special</option>
                  </select>
                  <div className="error">
                    {formik.touched.tags && formik.errors.tags ? (
                      <div>{formik.errors.tags}</div>
                    ) : null}
                  </div>
                </div>
                <div className="w-50 flex-grow-1">
                  <Select
                    mode="multiple"
                    allowClear
                    className="w-100"
                    placeholder="Select colors"
                    defaultValue={color}
                    onChange={(i) => handleColors(i)}
                    options={coloropt}
                  />
                  <div className="error">
                    {formik.touched.color && formik.errors.color}
                  </div>
                </div>
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
              {imagesisLoading ? (
                <Reloader />
              ) : (
                <>
                  <div className="bg-white text-center p-5 border-1">
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        dispatch(uploadImg(acceptedFiles))
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>

                  <div className="showImages d-flex flex-wrap gap-3">
                    {img?.map((img, index) => (
                      <div className="position-relative" key={index}>
                        <button
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px" }}
                          onClick={() => dispatch(deleteImg(img.public_id))}
                        ></button>
                        <img
                          src={img.url}
                          alt={img.url}
                          width={200}
                          height={200}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-4"
                disabled={imagesisLoading ? true : false}
              >
                Add Product
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
