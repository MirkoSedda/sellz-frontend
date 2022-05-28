import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { newProduct } from "../../../utils/product"
import { getSubCategoryBasedOnCategory } from "../../../utils/categoriesFetch"
import { AdminSidebar } from "../../../components/AdminSidebar"
import { ProductForm } from "../../../components/Forms/ProductForm"
import { FileUpload } from "../../../components/Forms/FileUpload"
import { getCategories } from "../../../utils/categoriesFetch";
import { Col, Container, Row } from "react-bootstrap"

export const CreateProduct = () => {

  const accessToken = useSelector(state => state.userReducer?.accessToken)

  const [values, valuesSetter] = useState({
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subCategories: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "White", "Red", "Blue", "Green"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
  })
  const [subCategoryOption, subCategoryOptionSetter] = useState([])
  const [showSubCategories, showSubCategoriesSetter] = useState(false)
  const [loading, loadingSetter] = useState(false)

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line 
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => valuesSetter({ ...values, categories: c.data }));

  const handleSubmit = e => {
    e.preventDefault()
    loadingSetter(true)
    newProduct(values, accessToken)
      .then(res => {
        loadingSetter(false)
        toast.success(`${res.data.title} created successfully`)
      })
      .catch(err => {
        loadingSetter(false)
        toast.error("Something went wrong")
        //mot working - err.data is undefined :(
        //toast.error(err.response.data)
      })
  }

  const handleChange = e => {
    valuesSetter({ ...values, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = e => {
    e.preventDefault()
    valuesSetter({ ...values, category: e.target.value, subCategories: [] })
    getSubCategoryBasedOnCategory(e.target.value).then(res => {
      subCategoryOptionSetter(res.data)
    })
    showSubCategoriesSetter(true)
  }

  return (
    <Container>
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>

        {loading ? (
          <h4 className="text-danger">Loading..</h4>
        ) : (
          <h4>Create product</h4>
        )}

        <ProductForm
          values={values}
          subCategoryOption={subCategoryOption}
          showSubCategories={showSubCategories}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCategoryChange={handleCategoryChange}
          valuesSetter={valuesSetter}
        />

        <FileUpload
          values={values}
          valuesSetter={valuesSetter}
          loadingSetter={loadingSetter}
        />
      </Row>
    </Container>
  )
}
