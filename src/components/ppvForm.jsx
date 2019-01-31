import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Sample from "../services/sampleService";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { getType } from "./../services/typeService";
import { getTransparency } from "./../services/transparencyService";
import { getSampleColor } from "./../services/sampleColorService";

class PPVForm extends Form {
  state = {
    data: {
      labno: "",
      postprocessComment: "",
      postprocessVolume: "",
      sampleColor: "",
      transparency: "",
      type: "",
      user: ""
    },
    errors: {},
    transparency: [],
    sampleColors: [],
    types: []
  };

  async componentDidMount() {
    const { data: types } = await getType();
    const { data: transparency } = await getTransparency();
    const { data: sampleColors } = await getSampleColor();
    const data = { ...this.state.data };
    const user = auth.getCurrentUser();
    data.user = user.id;

    this.setState({ types, transparency, sampleColors, data });
  }

  schema = {
    labno: Joi.string()
      .required()
      .regex(/^[a-zA-Z]{3}[0-9]{8}/)
      .min(11)
      .max(11)
      .label("Labno"),
    sampleColor: Joi.string()
      .required()
      .label("Sample Color"),
    transparency: Joi.string()
      .required()
      .label("Transparency"),
    type: Joi.string()
      .required()
      .label("Type"),
    postprocessComment: Joi.string()
      .max(5000)
      .allow(""),
    postprocessVolume: Joi.number().required(),
    user: Joi.number().integer()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data);
      // call the server
      await Sample.ppvSample(data);
      // clear the form for the next submit
      const clearData = { ...this.state.data };
      clearData.labno = "";
      clearData.sampleColor = "";
      clearData.transparency = "";
      clearData.type = "";
      clearData.postprocessComment = "";
      clearData.postprocessVolume = "";
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
        <h1>Sample PPV</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("labno", "Lab Number", "labno")}
          {this.renderSelect(
            "sampleColor",
            "Sample Color",
            this.state.sampleColors
          )}
          {this.renderSelect(
            "transparency",
            "Transparency",
            this.state.transparency
          )}
          {this.renderSelect("type", "Type", this.state.types)}
          {this.renderInput(
            "postprocessVolume",
            "Post-Process Volume",
            "number"
          )}
          {this.renderTextArea(
            "postprocessComment",
            "Comment",
            "preprocessComment"
          )}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default PPVForm;
