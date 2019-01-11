import React from 'react';
import CarMenu from './carMenu/CarMenu';

class ForthPart extends React.Component {

  componentDidMount() {
    fetch("./cars.json")
        .then(response => response.json())
        .then(cars => this.setState({cars}))
  }

  state = {
    cars: [],
    makeMenu: [],
    modelMenu: [],

    year: "year",
    make: "make",
    model: "model",

    mpg:"0",
    dailyTrip:"0",

    showFakeMake: {
        hidden: ''
    },
    showFakeModel: {
        hidden: ''
    },
    showMake: {
        hidden: 'hidden'
    },
    showModel: {
        hidden: 'hidden'
    }
  };

  submitHandler = (event) => {
    event.preventDefault();

    let trip = this.state.dailyTrip;
    let mpg = this.state.mpg;

    let year = this.state.year;
    let make = this.state.make;
    let model = this.state.model;

    this.props.carInfoUpdater(trip, mpg, year, make, model);

    this.props.hideChanger('showFifthPart');
    //this.props.createCustomer(trip, mpg, make, model, year);
  };

  setYear = (e) => {
    let year = e.target.value;
    this.setState({year: year});
    //this.updateCar(year, 1);
    this.makeMenuMaker(year);
  };

  setMake = (e) => {
      let make = e.target.value;
      this.setState({make: make});
      this.makeModelMenu(make);
      //this.updateCar(make,2);
  };

  setModel = (e) => {
      let model = e.target.value;
      this.setState({model: model});
      //this.updateCar(model,3);
  };

  setdailyTrip = (e) => {
    let dailyTrip = e.target.value;
    this.setState({dailyTrip: dailyTrip});

};

setMpg = (e) => {
    let mpg = e.target.value;
    this.setState({mpg: mpg});
};

  makeMenuMaker = (year) => {
    if (year !== 'year') {
        this.showMake(true);
        this.setState({makeMenu: (this.state.cars[year])});
    } else {
        this.showMake(false);
        this.setState({makeMenu: this.state.cars});
    }
  };

showMake = (bool) => {
    if (bool) {
        this.setState({showFakeMake: {hidden: 'hidden'}});
        this.setState({showMake: {hidden: ''}});
    } else {
        this.setState({showFakeMake: {hidden: ''}});
        this.setState({showMake: {hidden: 'hidden'}});
    }

};

makeModelMenu = (make) => {
    if (make !== 'make') {
        this.showModel(true);
        this.setState({modelMenu: this.state.makeMenu[make]});
    } else {
        this.showModel(false);
        this.setState({modelMenu: this.state.cars});
    }
};

showModel = (bool) => {
    if (bool) {
        this.setState({showFakeModel: {hidden: 'hidden'}});
        this.setState({showModel: {hidden: ''}});
    } else {
        this.setState({showFakeModel: {hidden: ''}});
        this.setState({showModel: {hidden: 'hidden'}});
    }
};

  render() {
    return (
      <div className='App'>
        <div className='main4'>

          <div className='p-2'>

            <h3 className="text-center">Interested to see how much a Plug-In Vehicle can increase savings?</h3>
            <input className='hidden' type='submit' value="" onClick={this.submitHandler} />

          </div>

          <div className="row">
            <div className="col-md-6 offset-md-3">

              <div className='card bg-light mt-2 rounded-0'>
                <div className="card-body p-5">

                  <div className="form-group">
                    <label>What is your daily average commute in miles?</label>
                    <input type="text" className="form-control" id="inputDailyTrip" onChange={this.setdailyTrip} />
                  </div>
                  <div className="form-group">
                    <label>What is your average miles per gallon?</label>
                    <input type="text" className="form-control" id="inputMPG" onChange={this.setMpg}/>
                  </div>
                  <div className="form-group">
                    <label>Plug-In Vehicle Type</label>
                    <CarMenu 
                      setYear={this.setYear} setMake={this.setMake} setModel={this.setModel}
                      year={this.state.year} make={this.state.make} model={this.state.model}
                      makeMenu={this.state.makeMenu} modelMenu={this.state.modelMenu}
                      showFakeMake={this.state.showFakeMake} showFakeModel={this.state.showFakeModel}
                      showMake={this.state.showMake} showModel={this.state.showModel}
                    />
                  </div>
                  <div className="form-group text-center mt-4">
                    <input className='btn btn-primary submitButton light' type='submit' value="Submit" onClick={this.submitHandler} />
                    <p text-align="center">Now serving San Diego</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <br></br>
          <section className="blog_thumbnail">
            <div className="row">
            <section className="col-md-2 pl-4 centerAlignedText " >
            <a href="https://www.makello.com/blog/what-the-competition-does-to-cut-corners" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                <img src = "images/blog_thumbnails/How_the_Competition_Cuts_Corners.JPG" className="single_blog_thumbnail" alt="How_the_Competition_Cuts_Corners">
                </img><br></br>
                How the Competition Cuts Corners 
                </a>
               </section>
              <section className="col-md-2 centerAlignedText " >
              <a href="https://www.makello.com/blog/vws-microbus-ev-redemption" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                <img src = "images/blog_thumbnails/VW_s Microbus_EV_Redemption.JPG" className="single_blog_thumbnail" alt="VW_s Microbus_EV Redemption.JPG">
                </img><br></br>
                VW's Microbus EV Redemption
                </a>
              </section> 
              <section className="col-md-2 centerAlignedText " >
              <a href="https://www.makello.com/blog/dirty_little_secrets_of_solar" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                <img src = "images/blog_thumbnails/Dirty_Little_Secrets_of_the_Solar_Industry.jpg" className="single_blog_thumbnail" alt="Buyer's Rights for Energy Upgrades">
                </img><br></br>
                Dirty Little Secrets of the Solar Industry
                </a>
              </section>
              <section className="col-md-2 centerAlignedText " >
              <a href="https://www.makello.com/blog/buyers-rights" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                <img src = "images/blog_thumbnails/Buyers_Rights_for_Energy_Upgrades.jpg" className="single_blog_thumbnail"  alt="Buyer's Rights for Energy Upgrades">
                </img><br></br>
                Buyer's Rights for Energy Upgrades
                </a>
              </section>
              {/* <section className="col-md-2 centerAlignedText" >
              <a href = "https://www.makello.com/blog/quality-in-manufacturing" target="_blank" rel="noopener noreferrer">
                <img src = "images/blog_thumbnails/Quality_in_Manufacturing.jpg" className="single_blog_thumbnail" alt="Quality in Manufacturing">
                </img><br></br>
                Quality in Manufacturing
                </a>
              </section> */}
              <section className="col-md-2 centerAlignedText " >
              <a href="https://www.makello.com/blog/a-quality-installation-lasts-a-lifetime" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                <img src = "images/blog_thumbnails/Quality_Installation_Lasts_a_Lifetime.jpg" className="single_blog_thumbnail" alt="Quality Installation Lasts a Lifetime">
                </img><br></br>
                Quality Installation Lasts a Lifetime
                </a>
              </section> 
               <section className="col-md-2 pr-4 centerAlignedText " >
               <a href="https://www.makello.com/blog/rivian-the-spirit-of-an-adventurer" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                <img src = "images/blog_thumbnails/Rivian_the_Spirit_of_an_Adventurer.jpg" className="single_blog_thumbnail" alt="Rivian, the Spirit of an Adventurer.jpg">
                </img><br></br>
                Rivian, the Spirit of an Adventurer
                </a>
              </section>
              
            </div>
          </section>
          
        </div>
      </div>
    );
  }
}

export default ForthPart;