import * as React from "react";
import { inject, observer } from "mobx-react";
import VillainStore from "../../stores/VillainStore";
import { IVillain } from "../../types/villain.type";

export interface EditVillainProps {
  VillainStore: typeof VillainStore;
  history: any;
  match: any;
}

export interface EditVillainState {
  isSuccess: boolean;
  villain: IVillain;
}

class EditVillain extends React.Component<EditVillainProps, EditVillainState> {
  state = {
    isSuccess: false,
    villain: {} as IVillain
  };

  async componentDidMount() {
    await VillainStore.loadVillain(this.props.match.params.id);
    const villain = VillainStore.villain as any;
    this.setState({ villain });
  }

  handleInputChange = ({
    currentTarget: input
  }: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = input;
    this.setState({
      villain: {
        ...this.state.villain,
        [name]: value
      }
    });

    // OR
    // const updatedVillain: Villain = { ...this.state.Villain };
    // const { name, value } = currentTarget;
    // updatedVillain[name] = value;
    // this.setState({
    //   Villain: updatedVillain
    // });
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    VillainStore.putVillain(this.state.villain);

    this.setState({ isSuccess: !this.state.isSuccess });
  };

  handleBackButton = () => {
    this.props.history.goBack();
  };

  public render() {
    const { firstName, lastName, house, knownAs } = this.state.villain;
    const { isSuccess } = this.state;

    return (
      <>
        <h2>Edit Villain</h2>
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={this.handleSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={this.handleInputChange}
                  type="text"
                  id="firstName"
                  className="form-control"
                />
              </div>
              <div className="mt-3 ml-3 input-width">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={lastName}
                  onChange={this.handleInputChange}
                  type="text"
                  id="lastName"
                  className="form-control"
                />
              </div>
            </section>
            <label className="mt-3">House</label>
            <input
              name="house"
              value={house}
              onChange={this.handleInputChange}
              type="text"
              id="house"
              className="form-control"
            />
            <label className="mt-3">Known as</label>
            <input
              name="knownAs"
              value={knownAs}
              onChange={this.handleInputChange}
              type="text"
              id="knownAs"
              className="form-control"
            />
            <button
              type="submit"
              disabled={isSuccess}
              className="btn btn-info mt-3"
            >
              Update
            </button>
            <button
              onClick={this.handleBackButton}
              type="button"
              className="btn btn-default mt-3"
            >
              Back
            </button>
          </form>
        </div>
        {isSuccess && (
          <div className="alert alert-success col-md-3" role="alert">
            This Villain has been updated!
          </div>
        )}
      </>
    );
  }
}

export default inject("VillainStore")(observer(EditVillain));
