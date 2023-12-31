import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  addBlogcategory,
  getSingleBlogCategory,
  resetState,
  updateBlogCategory,
} from "../../redux/slices/blogCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = object().shape({
  title: string().required("Blog Category Name is required"),
});

const AddBlogCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogCategoryId = location.pathname.split("/")[3];

  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    createdBlogcategory,
    singleblogCategorydata,
    updateBLogCategorydData,
  } = useSelector((state) => state.blogCategory);

  useEffect(() => {
    if (blogCategoryId !== undefined) {
      dispatch(getSingleBlogCategory(blogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, []);
  useEffect(() => {
    if (isSuccess && createdBlogcategory)
      toast.success("Blog category added successfully");
    if (isSuccess && updateBLogCategorydData)
      toast.success("Blog category updated successfully");
    if (isError) toast.error("some thing went wrong");
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singleblogCategorydata || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (blogCategoryId !== undefined) {
        const data = { id: blogCategoryId, Data: values };
        dispatch(updateBlogCategory(data));
        setTimeout(() => {
          navigate("/admin/blog-list-category");
        }, 1000);
      } else {
        dispatch(addBlogcategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Add Blog Category</h3>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Blog Category Name"
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
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="btn btn-success border-0 rounded-3 my-4"
            >
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogCategory;
