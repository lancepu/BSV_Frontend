import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Sample from "../services/sampleService";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { getSpecimen } from "../services/specimenService";

class SubmitForm extends Form {
  state = {
    data: { labno: "", specimen: "", user: "" },
    errors: {},
    specimens: []
  };

  async componentDidMount() {
    const { data: specimens } = await getSpecimen();
    const data = { ...this.state.data };
    const user = auth.getCurrentUser();
    data.user = user.id;

    this.setState({ specimens, data });
  }

  schema = {
    labno: Joi.string()
      .required()
      .regex(/^[a-zA-Z]{3}[0-9]{8}/)
      .min(11)
      .max(11)
      .label("Labno"),
    specimen: Joi.string()
      .required()
      .label("Specimen"),
    user: Joi.number().integer()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      // call the server
      await Sample.submitSample(data);
      // clear the form for the next submit
      const clearData = { ...this.state.data };
      clearData.labno = "";
      clearData.specimen = "";
      this.setState({ data: clearData });
    } catch (ex) {
      if ((ex.response && ex.response.status === 404) || 400) {
        toast.error(ex.response.data);
        const clearData = { ...this.state.data };
        clearData.labno = "";
        clearData.specimen = "";
        this.setState({ data: clearData });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Sample Submit</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("labno", "Lab Number", "labno")}
          {this.renderSelect("specimen", "Specimen", this.state.specimens)}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default SubmitForm;
