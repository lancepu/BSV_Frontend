import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Sample from "../services/sampleService";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { getTubeColor } from "./../services/tubeColorService";
import { getVisualInspect } from "./../services/visualInspectService";

class VerifyForm extends Form {
  state = {
    data: {
      labno: "",
      preprocessComment: "",
      preprocessVolume: "",
      tubeColor: "",
      visualInspect: "",
      user: ""
    },
    errors: {},
    tubeColors: [],
    visualInspect: []
  };

  async componentDidMount() {
    const { data: tubeColors } = await getTubeColor();
    const { data: visualInspect } = await getVisualInspect();
    const data = { ...this.state.data };
    const user = auth.getCurrentUser();
    data.user = user.id;

    this.setState({ tubeColors, visualInspect, data });
  }

  schema = {
    labno: Joi.string()
      .required()
      .regex(/^[a-zA-Z]{3}[0-9]{8}/)
      .min(11)
      .max(11)
      .label("Labno"),
    tubeColor: Joi.string()
      .required()
      .label("Tube Color"),
    visualInspect: Joi.string()
      .required()
      .label("Visual Inspect"),
    preprocessComment: Joi.string()
      .max(5000)
      .allow(""),
    preprocessVolume: Joi.number().required(),
    user: Joi.number().integer()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data);
      // call the server
      await Sample.verifySample(data);
      // clear the form for the next submit
      const clearData = { ...this.state.data };
      clearData.labno = "";
      clearData.tubeColor = "";
      clearData.visualInspect = "";
      clearData.preprocessComment = "";
      clearData.preprocessVolume = "";
      this.setState({ data: clearData });
    } catch (ex) {
      if ((ex.response && ex.response.status === 404) || 400) {
        toast.error(ex.response.data);
        // const clearData = { ...this.state.data };
        // clearData.labno = "";
        // clearData.tubeColor = "";
        // clearData.visualInspect = "";
        // clearData.preprocessComment = "";
        // clearData.preprocessVolume = "";
        // this.setState({ data: clearData });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Sample Verify</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("labno", "Lab Number", "labno")}
          {this.renderSelect("tubeColor", "Tube Color", this.state.tubeColors)}
          {this.renderSelect(
            "visualInspect",
            "Visual Inspect",
            this.state.visualInspect
          )}
          {this.renderInput("preprocessVolume", "Pre-Process Volume", "number")}
          {this.renderTextArea(
            "preprocessComment",
            "Comment",
            "preprocessComment"
          )}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default VerifyForm;
