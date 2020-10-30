import React from "react";
import axios from "axios";
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUpdate: null,
      nameUpdateCreate: null,
      nameButton: "",

      photoCover: null,
      photoContent_1: "",
      photoContent_2: "",
      product_description_1: "",
      product_description_2: "",
      product_name: "",
      product_price: "",
      product_slug: "",
      product_summary: "",
    };
    this.handleChangePostName = this.handleChangePostName.bind(this);
    this.handleChangePostSummary = this.handleChangePostSummary.bind(this);
    this.handleChangePostContent1 = this.handleChangePostContent1.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.apiUpdate = this.apiUpdate.bind(this);
  }
  componentDidMount() {
    const slug = this.props.location.pathname.split("/");
    const id = slug[2];
    // update post
    if (slug[1] === "update-post") {
      axios.get("/getPost/" + id).then((response) => {
        this.setState({
          idUpdate: id,
          nameUpdateCreate: "Update A Post",
          nameButton: "Update",
          dataUpdate: response.data.data,
        });
      });
    }
    // create post
    if (slug[1] === "create-post") {
      this.setState({
        nameUpdateCreate: "Create A Post",
        nameButton: "Add",
      });
    }
  }
  handleChangePostName(event) {
    this.setState({
      product_name: event.target.value,
    });
  }
  handleChangePostSummary(event) {
    this.setState({
      product_summary: event.target.value,
    });
  }
  handleChangePostContent1(event) {
    this.setState({
      product_description_1: event.target.value,
    });
  }
  onFileChange(event) {
    this.setState({
      photoCover: event.target.files[0],
    });
  }
  apiUpdate(event) {
    event.preventDefault();
    let url = "/create-post";
    if (this.state.idUpdate) {
      url = "/update-post/" + this.state.idUpdate;
    }
    // Create an object of formData
    // const formData = new FormData();
    // Update the formData object
    // formData.append("photoCover",this.state.photoCover);
    // formData.append("product_name",this.state.product_name);
    // formData.append("product_summary",this.state.product_summary);
    // formData.append("product_description_1",this.state.product_description_1);
    // formData.append("_id",this.state.idUpdate);
    axios
      .post(url, {
        // formData
        product_name: this.state.product_name,
        product_summary: this.state.product_summary,
        product_description_1: this.state.product_description_1,
        // photoCover: this.state.photoCover,
        _id: this.state.idUpdate,
      })
      .then((response) => {
        console.log(response);
      });
  }
  render() {
    return (
      <div className="container custom-container">
        <div className="row">
          <div className="box-create-post">
            <h1>{this.state.nameUpdateCreate}</h1>
            <form
              onSubmit={this.apiUpdate}
              className="form-create-product"
              encType="multipart/form-data"
            >
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="form-group">
                    <label htmlFor="product_name">Product Title: </label>
                    <input
                      className="form-control"
                      id="product_name"
                      type="text"
                      name="product_name"
                      defaultValue={this.state.product_name}
                      onChange={this.handleChangePostName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_summary">Product Summary: </label>
                    <input
                      className="form-control"
                      id="product_summary"
                      type="text"
                      name="product_summary"
                      defaultValue={this.state.product_summary}
                      onChange={this.handleChangePostSummary}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoCover">Choose one photoCover:</label>
                    <input
                      id="photoCover"
                      type="file"
                      accept="image/*"
                      name="photoCover"
                      onChange={this.onFileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_description_1">
                      Product content 1:
                    </label>
                    <textarea
                      className="product_description form-control"
                      id="product_description_1"
                      name="product_description_1"
                      cols="100"
                      rows="5"
                      defaultValue={this.state.product_description_1}
                      onChange={this.handleChangePostContent1}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoContent_1">
                      Choose one photo for content 1:
                    </label>
                    <input
                      id="photoContent_1"
                      type="file"
                      accept="image/*"
                      name="photoContent_1"
                    />
                  </div>
                  <div className="btn btn-success btnPlus">Plus 1 Content</div>
                  <div className="form-group">
                    <label id="idSeeImg" htmlFor="xao">
                      Choose many photos:
                    </label>
                    <input id="photos" type="file" name="images" multiple="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_price">Product Price: </label>
                    <input
                      className="form-control"
                      id="product_price"
                      type="text"
                      name="product_price"
                      defaultValue={this.state.product_price}
                    />
                  </div>
                  <button
                    className="btn btn-success btn-hoa-wait"
                    type="submit"
                  >
                    {this.state.nameButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreatePost;
