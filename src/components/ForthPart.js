import React from 'react';
import CarMenu from './carMenu/CarMenu';

class ForthPart extends React.Component {

  componentDidUpdate() {
    //scroll.scrollToTop();
    window.scrollTo(0,0);
  }


  render() {
    return (
      <div className='App'>
        <div className='main4'>
          <div className='p-2'>
            <h3 className="text-center">Interested to see how much a Plug-In Vehicle can increase savings?</h3>
          </div>

          <div className="row">
            <div className="col-md-6 offset-md-3">

              <div className='card bg-light mt-2 rounded-0'>
                <div className="card-body p-5">
                  <CarMenu carInfoUpdater={this.props.carInfoUpdater}
                    hideChanger={this.props.hideChanger}/>
                </div>
              </div>

            </div>
          </div>
          <br></br>
          
          <section className="blogThumbnails text-center">
            <div className="row no-gutters">
              <div className="col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="https://www.makello.com/blog/what-the-competition-does-to-cut-corners" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/How_the_Competition_Cuts_Corners.JPG" className="single_blog_thumbnail" alt="How_the_Competition_Cuts_Corners" />
                    <div className="caption">How the Competition Cuts Corners</div>
                  </a>
                </div>
              </div>
              <div className="col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="https://www.makello.com/blog/vws-microbus-ev-redemption" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/VW_s Microbus_EV_Redemption.JPG" className="single_blog_thumbnail" alt="VW_s Microbus_EV Redemption.JPG" />
                    <div className="caption">VW's Microbus EV Redemption</div>
                  </a>
                </div>
              </div> 
              <div className="col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="https://www.makello.com/blog/dirty_little_secrets_of_solar" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Dirty_Little_Secrets_of_the_Solar_Industry.jpg" className="single_blog_thumbnail" alt="Buyer's Rights for Energy Upgrades" />
                    <div className="caption">Dirty Little Secrets of the Solar Industry</div>
                  </a>
                </div>
              </div>
              <div className="col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="https://www.makello.com/blog/buyers-rights" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Buyers_Rights_for_Energy_Upgrades.jpg" className="single_blog_thumbnail"  alt="Buyer's Rights for Energy Upgrades" />
                    <div className="caption">Buyer's Rights for Energy Upgrades</div>
                  </a>
                </div>
              </div>
              <div className="col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="https://www.makello.com/blog/a-quality-installation-lasts-a-lifetime" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Quality_Installation_Lasts_a_Lifetime.jpg" className="single_blog_thumbnail" alt="Quality Installation Lasts a Lifetime" />
                    <div className="caption">Quality Installation Lasts a Lifetime</div>
                  </a>
                </div>
              </div> 
              <section className="col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="https://www.makello.com/blog/rivian-the-spirit-of-an-adventurer" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Rivian_the_Spirit_of_an_Adventurer.jpg" className="single_blog_thumbnail" alt="Rivian, the Spirit of an Adventurer.jpg" />
                    <div className="caption">Rivian, the Spirit of an Adventurer</div>
                  </a>
                </div>
              </section>
            </div>
          </section>
          
        </div>
      </div>
    );
  }
}

export default ForthPart;