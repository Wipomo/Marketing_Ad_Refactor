import React from 'react';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import ForthPart from './ForthPart';
import FifthPart from './FifthPart';

class App extends React.Component {

  state = {
    showFirstPart: {
      hidden: ''
    },
    showTooltip: {
      hidden: ''
    },
    showSecondPart: {
      hidden: 'hidden'
    },
    showThirdPart: {
      hidden: 'hidden'
    },
    showForthPart: {
      hidden: 'hidden'
    },
    showFifthPart: {
      hidden: 'hidden'
    },
    clientProfile: {
      monthlyBill: 525,
      email: '',
      fullName: '',
      phone: '',
      address: '',
      dailyTrip: '',
      mpg: '',
      carYear: '',
      carMake: '',
      carModel: '',
      saveAmount: ''
    },
    chartData: {
      savingsPercent: 0.0,
      savingsAmount: "",
      installFee: "",
      annual: 0,
      eco: {
        cost: 0,
        data: []
      },
      inter: {
        cost: 0,
        data: []
      },
      prem: {
        cost: 0,
        data: []
      }
    },
    userId: 0,
    resolution: window.innerWidth
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // handlers start

  handleWindowSizeChange = () => {
    this.setState({ resolution: window.innerWidth });
  };

  handleSlideChange = (event) => {
    let clientData = { ...this.state.clientProfile };
    let annual = event * 12;
    this.setState({ clientProfile: clientData });
    this.doTheThing(event, annual);
  };

  hideChanger = (input) => {
    if (this.state[input].hidden === 'hidden') {
      this.setState({ showFirstPart: { hidden: 'hidden' } });
      this.setState({ showTooltip: { hidden: ' hidden' } });
      this.setState({ showSecondPart: { hidden: 'hidden' } });
      this.setState({ showThirdPart: { hidden: 'hidden' } });
      this.setState({ showForthPart: { hidden: 'hidden' } });
      this.setState({ showFifthPart: { hidden: 'hidden' } });
      this.setState({ [input]: { hidden: '' } });
    } else {
      this.setState({ [input]: { hidden: 'hidden' } });
    }
  };

  emailValidator = (email) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log("Email valid");
      return true;
    } else {
      console.log("Invalid Email");
      return false;
    }
  };

  billEmailUpdater = (bill, email) => {
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.monthlyBill = bill;
    clientProfile.email = email;
    this.setState({ clientProfile });
    this.postBillEmailData(bill, email);
  };

  clientInfoUpdater = (fullName, phone, address) => {
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.fullName = fullName;
    clientProfile.phone = phone;
    clientProfile.address = address;
    clientProfile.saveAmount = this.state.chartData.savingsAmount;
    this.setState({ clientProfile });
    this.putClientInfo(fullName, phone, address);
  };

  carInfoUpdater = (dailyTrip, mpg, year, make, model) => {
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.dailyTrip = dailyTrip;
    clientProfile.mpg = mpg;
    clientProfile.carYear = year;
    clientProfile.carMake = make;
    clientProfile.carModel = model;
    this.setState({ clientProfile });
    this.putCarInfo(dailyTrip, mpg, year, make, model)
  };

  postBillEmailData = (bill, email) => {
    fetch("https://makeitlow-makello-server.herokuapp.com/customers/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        monthlyBill: bill,
        email: email
      })
    })
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        this.setUserId(resData.customer.id);
      })
  };

  putClientInfo = (fullName, phone, address) => {
    fetch(`https://makeitlow-makello-server.herokuapp.com/customers/${this.state.userId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName,
        phone: phone,
        address: address
      })
    })
      .then(response => response.json())
      .then(resData => console.log(resData))
  };

  putCarInfo = (dailyTrip, mpg, year, make, model) => {
    fetch(`https://makeitlow-makello-server.herokuapp.com/customers/${this.state.userId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dailyTrip: dailyTrip,
        mpg: mpg,
        year: year,
        make: make,
        model: model
      })
    })
      .then(response => response.json())
      .then(resData => console.log(resData))
  };

  setUserId = (data) => {
    this.setState({ userId: data });
    this.sendNewLeadEmail();
  };

  sendNewLeadEmail = () => {
    fetch(`https://makeitlow-makello-server.herokuapp.com/generate-email`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: "info@makello.com",
        bcc: "ellie.lader@wipomo.com",
        subject: `New Lead Generated - ${this.state.clientProfile.email}`,
        body: `A new lead had been added to the database.
                Database ID: ${this.state.userId}
                Email: ${this.state.clientProfile.email}`
      })
    })
  };

  sendSecondCustomerEmail = () => {
    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        bcc: "no-reply@makello.com",
        subject: `Hello from Makello!`,
        body: `Thank you for considering saving The Makello Way!
                A representative will be in touch with you soon to discussion how you can save up to ${"$" + this.state.chartData.savingsAmount} annually by using 100% Clean Energy!.
                In the meantime - feel free to visit us at our website www.makello.com`
      })
    })
  };

  createCustomerEmail = () => {
    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        bcc: "no-reply@makello.com",
        subject: `Hello from Makello!`,
        body: `Thank you for considering saving The Makello Way!
                A representative will be in touch with you soon to discussion how you can save up to ${"$" + this.state.chartData.savingsAmount} annually by using 100% Clean Energy!.
                In the meantime - feel free to visit us at our website www.makello.com`
      })
    })
  };

  // chart functionality with state

  doTheThing = (num1, num2) => {

    let tempStr2 = num2.toString().slice(0, 2);

    if (num1 < 150) {
      tempStr2 = "13";
    } else if (num1 >= 650) {
      tempStr2 = "74";
    }

    let chartData = {};

    switch (parseInt(tempStr2)) {
      case 13:
        chartData = {
          savingsPercent: 0.39,
          savingsAmount: "818",
          installFee: "6,395",
          annual: 1342,
          eco: {
            cost: 6395,
            data: [-6395, -4004, -3517, -3074, -2608, -2116, -1598, -1052, -477, 129, 767, 1439, 2147, 2893, 3678]
          },
          inter: {
            cost: 9511,
            data: [-9511, -5837, -4986, -4157, -3279, -2352, -1371, -335, 760, 1917, 3138, 4429, 5791, 7229, 8746]
          },
          prem: {
            cost: 12307,
            data: [-12307, -7456, -6250, -5043, -3764, -2409, -975, 541, 2147, 3846, 5642, 7541, 9548, 11669, 13909]
          }
        };
        this.setChartData(chartData);
        break;
      case 18:
        chartData = {
          savingsPercent: 0.42,
          savingsAmount: "998",
          installFee: "7,999",
          annual: 1721,
          eco: {
            cost: 7999,
            data: [-7999, -5117, -4689, -4239, -3766, -3271, -2747, -2193, -1607, -988, -334, 356, 1086, 1857, 2671]
          },
          inter: {
            cost: 13507,
            data: [-13507, -8415, -7405, -6342, -5223, -4046, -2799, -1479, -82, 1396, 2960, 4615, 6365, 8216, 10173]
          },
          prem: {
            cost: 16988,
            data: [-16988, -10522, -9164, -7729, -6213, -4612, -2912, -1106, 811, 2846, 5004, 7294, 9721, 12294, 15020]
          }
        };
        this.setChartData(chartData);
        break;
      case 24:
        chartData = {
          savingsPercent: 0.48,
          savingsAmount: "1,291",
          installFee: "5,682",
          annual: 2483,
          eco: {
            cost: 5682,
            data: [-5682, -3191.188735, -2473.553901, -1715.847347, -915.8729654, -71.31293976, 820.2788303, 1761.483879, 2755.026512, 3803.781845, 4910.7844, 6079.236854, 7312.518872, 8614.197674, 9988.03804]
          },
          inter: {
            cost: 11830,
            data: [-11830.5, -6706.063784, -5164.960257, -3536.830375, -1817.037487, -0.694203545, 1917.350304, 3942.524315, 6080.548733, 8337.452721, 10719.59055, 13233.65964, 15886.71927, 18686.20907, 21639.96989]
          },
          prem: {
            cost: 17263,
            data: [-17263.5, -9890.144676, -7700.479363, -5383.520092, -2932.53903, -340.4473474, 2400.223093, 5297.340907, 8359.196195, 11594.52239, 15012.52041, 18622.88347, 22435.82442, 26462.10285, 30713.05403]
          }
        };
        this.setChartData(chartData);
        break;
      case 30:
        chartData = {
          savingsPercent: 0.47,
          savingsAmount: "1,778",
          installFee: "7,999",
          annual: 3355,
          eco: {
            cost: 7999,
            data: [-7999.0, -4410.987376, -3165.611976, -1918.929874, -600.005239, 795.3254953, 2271.466845, 3833.078323, 5485.08896, 7232.713114, 9081.46666, 11037.18487, 13106.04078, 15294.56474, 17609.66507]
          },
          inter: {
            cost: 15296,
            data: [-15296.1, -8548.535514, -6290.941365, -3972.770437, -1519.868134, 1075.324201, 3820.791959, 6724.970698, 9796.772493, 13045.61271, 16481.43838, 20114.75831, 23956.67522, 28018.91829, 32313.88009]
          },
          prem: {
            cost: 24823,
            data: [-24823.5, -14329.24213, -11141.18378, -7833.228792, -4328.004233, -614.5565851, 3318.680134, 7483.918776, 11894.05546, 16562.70686, 21504.25173, 26733.87301, 32267.60302, 38122.37046, 44316.05063]
          }
        };
        this.setChartData(chartData);
        break;
      case 36:
        chartData = {
          savingsPercent: 0.47,
          savingsAmount: "2,056",
          installFee: "7,999",
          annual: 3880,
          eco: {
            cost: 7999,
            data: [-7999, -4343.71038, -3097.23151, -1782.256038, -395.0097936, 1068.493172, 2616.771805, 4254.733597, 5987.571118, 7820.778067, 9760.166974, 11811.88731, 13982.44541, 16278.72518, 18708.01054]
          },
          inter: {
            cost: 18100,
            data: [-18100.8, -10281.29845, -7853.583108, -5293.807751, -2595.10246, 249.7675024, 3260.829271, 6447.495435, 9819.714077, 13387.99922, 17163.46302, 21157.84992, 25383.57272, 29853.75041, 34582.24859]
          },
          prem: {
            cost: 29448,
            data: [-29448, -17170.56506, -13641.8675, -9917.711166, -5988.131545, -1842.645221, 2550.37961, 7204.860059, 12135.4996, 17357.83262, 22888.27107, 28744.15416, 34943.80101, 41506.56592, 48452.89702]
          }
        };
        this.setChartData(chartData);
        break;
      case 42:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "2,280",
          installFee: "5,700",
          annual: 4224,
          eco: {
            cost: 5700,
            data: [-5700, -2802.923926, -1624.800996, -379.2296789, 937.6499817, 2329.920209, 3801.898295, 5358.149809, 7003.50327, 8743.065154, 10582.23618, 12526.72798, 14582.58112, 16756.1844, 19054.29497]
          },
          inter: {
            cost: 17340,
            data: [-17340, -9555.301177, -6922.680854, -4142.046183, -1205.345231, 1895.917155, 5170.702582, 8628.466416, 12279.18474, 16133.38217, 20202.16294, 24497.2422, 29030.98071, 33816.42009, 38867.32073]
          },
          prem: {
            cost: 29700,
            data: [-29700, -16905.39612, -12911.61359, -8689.117167, -4225.661322, 491.6627303, 5476.462753, 10743.08355, 16306.64929, 22183.10398, 28389.25623, 34942.82497, 41862.49125, 49167.94858, 56879.95843]
          }
        };
        this.setChartData(chartData);
        break;
      case 48:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "2,715",
          installFee: "7,999",
          annual: 5028,
          eco: {
            cost: 7999,
            data: [-7999, -3905.638174, -2194.873753, -387.7904229, 1521.059996, 3537.437027, 5671.738625, 7930.862624, 10322.11086, 12853.2131, 15532.35192, 18368.18962, 21369.89604, 24547.17846, 27910.31313]
          },
          inter: {
            cost: 20613,
            data: [-20613.6, -11305.52297, -8105.345689, -4729.690852, -1169.252013, 2585.779174, 6560.201137, 10766.52758, 15217.98938, 19928.57495, 24913.07435, 30187.12492, 35767.26003, 41670.96055, 47916.70896]
          },
          prem: {
            cost: 34473,
            data: [-34473.6, -19662.44545, -15058.33327, -10199.68931, -5073.350529, 334.54105, 6063.24665, 12130.89676, 18556.6508, 25360.7565, 32564.61134, 40190.82817, 48263.30406, 56807.29318, 65849.48438]
          }
        };
        this.setChartData(chartData);
        break;
      case 54:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "3,043",
          installFee: "5,700",
          annual: 5636,
          eco: {
            cost: 5700,
            data: [-5700, -1571.835383, 1055.102421, 3634.781192, 6244.03659, 8994.865917, 11817.39678, 14720.3814, 17791.22495, 21039.73527, 24476.29544, 28111.89668, 31958.17486, 36003.26353, 40284.38768]
          },
          inter: {
            cost: 18360,
            data: [-18360, -8118.728573, -2744.751002, 2292.348659, 7228.667592, 12412.86201, 17607.03865, 22825.77248, 28336.15161, 34154.4367, 40297.80197, 46784.38811, 53633.35578, 60787.04483, 68344.73447]
          },
          prem: {
            cost: 30690,
            data: [-30690, -14711.10619, -6880.884688, 326.0827527, 7300.779492, 14622.11538, 21888.30527, 29119.33318, 36757.00946, 44823.58553, 53342.54297, 62338.66276, 71838.09707, 81738.23068, 92198.40027]
          }
        };
        this.setChartData(chartData);
        break;
      case 60:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "3,426",
          installFee: "6,813",
          annual: 6345,
          eco: {
            cost: 6813,
            data: [-6813.9, -2070.371445, 772.9184628, 3677.169643, 6752.397773, 10008.68021, 13456.689, 17107.72614, 20973.76069, 25067.46817, 29402.27258, 33992.39039, 38852.87741, 43999.67853, 49449.67993]
          },
          inter: {
            cost: 22522,
            data: [-22522.05, -11145.08259, -6300.45677, -1280.99942, 4029.4866, 9647.599459, 15590.88866, 21877.91061, 28528.28606, 35562.76112, 43003.27192, 50873.01273, 59196.50815, 67999.68976, 77309.97769]
          },
          prem: {
            cost: 36710,
            data: [-36710.975, -19457.18506, -12917.56445, -6097.312266, 1125.51122, 8773.558944, 16870.76794, 25442.43148, 34515.27547, 44117.53971, 54279.06339, 65031.37763, 76407.8015, 88443.542, 101175.8024]
          }
        };
        this.setChartData(chartData);
        break;
      case 66:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "3,623",
          installFee: "7,898",
          annual: 6711,
          eco: {
            cost: 7898,
            data: [-7898.4, -3029.77545, -396.9859573, 2317.020349, 5187.851438, 8224.617817, 11440.80331, 14847.01788, 18454.49947, 22275.15111, 26321.58044, 30607.14144, 35145.97856, 39953.07365, 45044.29547]
          },
          inter: {
            cost: 28283,
            data: [-28283.4, -15370.1167, -10730.2692, -5904.372003, -811.706653, 4562.202993, 10250.02889, 16269.82791, 22640.70006, 29382.84851, 36517.64298, 44067.68698, 52056.88975, 60510.54205, 69455.39516]
          },
          prem: {
            cost: 48164,
            data: [-48164.4, -27499.28715, -20993.91873, -14197.6159, -7024.541719, 545.1515672, 8563.288011, 17055.37338, 26048.37095, 35570.78476, 45652.74742, 56326.11361, 67624.55879, 79583.68301, 92241.12104]
          }
        };
        this.setChartData(chartData);
        break;
      case 72:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "3,941",
          installFee: "6,773",
          annual: 7299,
          eco: {
            cost: 6773,
            data: [-6773.7, -1924.714551, 978.1723844, 4052.169498, 7307.366744, 10754.45002, 14404.73642, 18270.21145, 22363.56863, 26698.25109, 31288.49615, 36149.38251, 41296.87956, 46747.90054, 52520.35801]
          },
          inter: {
            cost: 22341,
            data: [-22341.15, -10872.93519, -5939.604125, -719.3984338, 4804.063338, 10648.10243, 16831.03403, 23372.22612, 30292.1585, 37612.48706, 45356.11079, 53547.24403, 62211.4917, 71375.92985, 81069.19015]
          },
          prem: {
            cost: 37573,
            data: [-37573.6, -19687.50658, -12823.72175, -5557.082304, 2135.08399, 10276.73362, 18893.18073, 28011.17588, 37658.98469, 47866.47422, 58665.2051, 70088.52671, 82171.67899, 94951.89995, 108468.5401]
          }
        };
        this.setChartData(chartData);
        break;
      case 74:
        chartData = {
          savingsPercent: 0.46,
          savingsAmount: "4,007",
          installFee: "6,773",
          annual: 7421,
          eco: {
            cost: 6773,
            data: [-6773.7, -1732.874345, 1437.880197, 4689.12747, 8132.047988, 11777.95325, 15638.82303, 19727.34499, 24056.95695, 28641.89111, 33497.22094, 38638.91084, 44083.86907, 49850.00354, 55956.28081]
          },
          inter: {
            cost: 23582,
            data: [-23582.325, -11378.43197, -5997.685098, -409.6321972, 5503.791012, 11761.15724, 18382.10534, 25387.40066, 32799.00143, 40640.12634, 48935.32583, 57710.56007, 66993.28142, 76812.51963, 87198.9712]
          },
          prem: {
            cost: 39921,
            data: [-39921.95, -20855.76948, -13424.945, -5659.95894, 2564.137262, 11273.17803, 20494.4623, 30256.83532, 40590.77658, 51528.49282, 63104.01502, 75353.30321, 88314.35525, 102027.3231, 116534.6352]
          }
        };
        this.setChartData(chartData);
        break;
      default:
        console.log("You shouldn't see this");
        break;
    }
  };

  setChartData = (data) => {
    this.setState({ chartData: data });
  };

  render() {

    if (this.state.resolution <= 900) {
      var root = document.querySelector(':root');
      root.style.setProperty('--page-layout', '0% 100% 0%');
    }

    return (
      <div className="container responsive-container container-wrapper remove-pd15">
        <div className={`FirstPart ${this.state.showFirstPart.hidden}`}>
          <FirstPart
            billEmailUpdater={this.billEmailUpdater}
            hideChanger={this.hideChanger}
            showTooltip={this.state.showTooltip}
            monthlyBill={this.state.clientProfile.monthlyBill}
            emailValidator={this.emailValidator}
            handleSlideChange={this.handleSlideChange}
          />
        </div>
        <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
          <SecondPart
            monthlyBill={this.state.clientProfile.monthlyBill}
            clientInfoUpdater={this.clientInfoUpdater}
            hideChanger={this.hideChanger}
            createCustomerEmail={this.createCustomerEmail}
            getSaveAmount={this.getSaveAmount}
            chartData={this.state.chartData}
          />
        </div>
        <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
          <ThirdPart hideChanger={this.hideChanger} />
        </div>
        <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
          <ForthPart carInfoUpdater={this.carInfoUpdater} hideChanger={this.hideChanger} />
        </div>
        <div className={`ThirdPart ${this.state.showFifthPart.hidden}`}>
          <FifthPart hideChanger={this.hideChanger} />
        </div>
      </div>
    );
  }
}

export default App;