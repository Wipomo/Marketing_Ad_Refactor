import React from 'react';

class FifthPart extends React.Component {

  imgHandler = (event) => {
    event.preventDefault();
    //window.location.href = "http://www.makello.com";
    window.open("http://www.makello.com", '_blank');
  };

  render() {
    return (
      <div className='App'>
        <div className='main3 fifth-part'>

          {/* <div className='jumbotron text-center bg-white'>
              <h3 className="display-6">Thank you for the additional information!</h3>
              <p className='lead'>Check for a confirmation email in your Inbox or SPAM folder</p>
              <div>Add us to your Contacts to receive a personalized <a href="https://www.makello.com/energy-analysis.html">Energy Analysis</a> from <a href="https://www.makello.com/">Makello</a>!</div>
              <div>For any questions, please dial our toll free number: (855) 692-3289. </div>
          </div> */}

          <div className='jumbotron text-center rounded-0 border-0 mb-0'>
            <div className='row'>
              <div className="col-md-4 offset-md-4">
                <a href="https://www.makello.com" target="_blank" rel="noopener noreferrer" >
                  <img className="full-width" border="1px" src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
                </a>
              </div>
            </div>
            <p><a href="https://www.makello.com" target="_blank" rel="noopener noreferrer" >
              www.makello.com 
              </a></p>
          </div>

          {/* <section className="blogThumbnails text-center">
          <div className="row no-gutters">
            <div className="col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/quality-in-manufacturing" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src = "images/blog_thumbnails/Quality_in_Manufacturing.jpg" className="single_blog_thumbnail" alt="Quality in Manufacturing" />
                  <div className="caption">Quality in Manufacturing</div>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/dirty_little_secrets_of_solar" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src="images/blog_thumbnails/Dirty_Little_Secrets_of_the_Solar_Industry.jpg" className="single_blog_thumbnail" alt="Buyer's Rights for Energy Upgrades" />
                  <div className="caption">Dirty Little Secrets of the Solar Industry</div>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/what-the-competition-does-to-cut-corners" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src="images/blog_thumbnails/How_the_Competition_Cuts_Corners.JPG" className="single_blog_thumbnail" alt="How_the_Competition_Cuts_Corners" />
                  <div className="caption">How the Competition Cuts Corners</div>
                </a>
              </div>
            </div>
            <div className=" col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/rivian-the-spirit-of-an-adventurer" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src="images/blog_thumbnails/Rivian_the_Spirit_of_an_Adventurer.jpg" className="single_blog_thumbnail"alt="Rivian, the Spirit of an Adventurer.jpg" />
                  <div className="caption">Rivian, the Spirit of an Adventurer</div>
                </a>
              </div>
            </div>
          </div>
        </section> */}

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


export default FifthPart;