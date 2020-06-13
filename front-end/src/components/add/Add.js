import React, { Component } from 'react';
import Auth from '../../Authentication/Auth';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            date: "",
            time: "",
            venue: "",
            events:null,
            image: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        this.loadEvents();
    }

    async loadEvents() {
        try {
            const res = await fetch("http://localhost:5000/event/events/");
            const data = await res.json();
            //updateing state with lastest data
            this.setState({
                events: data,
            });
            
        } catch (e) {
            //if failed to communicate with api this code block will run
            console.log(e);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value
        const name = target.name;

        this.setState({
            [name]: value

        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        if (this.state.name.trim() !== 0) {
            try {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json",token: Auth.getToken()  },
                    body: JSON.stringify({
                        name: this.state.name,
                        description: this.state.description,
                        date: this.state.date,
                        time: this.state.time,
                        venue: this.state.venue,
                        image: this.state.image

                    }),
                };
                await fetch(
                    "http://localhost:5000/event/newEvent",
                    requestOptions
                );
                this.loadEvents();
                this.setState({
                    name: "",
                    description: "",
                    date: "",
                    time: "",
                    venue: "",
                    image: ""
                });
                alert("Aded successfully!");
            } catch (e) {
                console.log(e);
            }
        }
    }
    
  async deleteEvent(id) {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json",token: Auth.getToken()  },
        body: JSON.stringify({ id: id }),
      };
      await fetch("http://localhost:5000/event/events", requestOptions);
      alert("Deleted");
      this.loadEvents();
    } catch (e) {
      console.log(e);
    }
  }






    render() {
        let eventlist;

        if (this.state.events !== null) {
            eventlist = this.state.events.map((event, key) => {
                return (
                    <ul key={key} className="list-group list-group-flush">
                        <li className="list-group-item"> </li>
                        <div className="row m-2">
                <h4 className="col-10">{key +1} . {event.name}</h4>  <button type="" className="btn btn-danger col-1 " onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteEvent(event._id) } }>Delete</button>
                        </div>

                    </ul>
                )
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <form className="mt-5 col-lg-6 mx-auto" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" name="name" onChange={this.handleChange} className="form-control" value={this.state.name} placeholder="Name of the event" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text" name="description" onChange={this.handleChange} className="form-control" value={this.state.description} placeholder="Small description" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Date</label>
                            <div className="col-sm-10">
                                <input type="Date" name="date" onChange={this.handleChange} className="form-control" value={this.state.date} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Time</label>
                            <div className="col-sm-10">
                                <input type="time" name="time" onChange={this.handleChange} className="form-control" value={this.state.time} placeholder="HH/MM" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Venue</label>
                            <div className="col-sm-10">
                                <input type="text" name="venue" className="form-control" onChange={this.handleChange} value={this.state.venue} placeholder="Place where the event happens" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Image</label>
                            <div className="col-sm-10">
                                <input type="text" name="image" className="form-control" onChange={this.handleChange} value={this.state.image} placeholder="Url of the Image" />
                            </div>
                        </div>


                        <div className="form-group">
                            <div className=" mx-auto">
                                <button type="submit" className="btn btn-success col-3 m-2">Submit</button>

                            </div>

                        </div>

                    </form>

                </div>
                <div className="">
                    {eventlist}

                </div>
            </div>
        );
    }
}

export default Add;