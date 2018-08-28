import React from 'react';

class Radio extends React.Component {
    render() {

        let handleChange = (e) => {
            let value = e.target.value;
            userCar.year = e.target.value;
            console.log(userCar);

            switch (value) {
                case '2017':
                    console.log(cars.year["2017"].make.Fiat);
                    break;
                case '2018':
                    console.log(cars.year["2018"].make);
                    break;
            }

        };


        const cars = {
            year: {
                "2018": {
                    make: {
                        'Audi': ['A3 Sportback e-tron'],
                        'BMW': ['330e iPerformance','530e iPerformance','i3','i3 REx','i3s','i3s REx','i8 Coupe','i8 Roadster','X5 xDrive40e'],
                        'Cadillac': ['CT6 PHEV'],
                        'Chevrolet': ['Bolt EV','Volt'],
                        'Chrysler': ['Pacifica Hybrid'],
                        'Ford': ['Focus Electric', 'Fusion Energi'],
                        'Honda': ['Clarity Plug-in Hybrid'],
                        'Hyundai': ['IONIQ Electric', 'IONIQ Plug-in Hybrid'],
                        'Karma': ['Revero'],
                        'Kia': ['Niro PHEV', 'Optima PHEV', 'Soul EV'],
                        'Mercedes': ['C350e', 'GLE 550e'],
                        'MINI': ['Cooper S E Countryman ALL4'],
                        'Mitsubishi': ['Outlander PHEV'],
                        'Nissan': ['LEAF'],
                        'Porsche': ['Cayenne S E-Hybrid','Panamera 4 E-Hybrid','Panamera Turbo S E-Hybrid'],
                        'smart': ['fortwo ED Cabrio','fortwo ED Coupe'],
                        'Tesla': ['Model 3 Standard','Model 3 Long Range','Model S 75D','Model S 100D','Model S P100DL','Model X 75D','Model X 100D','Model X P100DL'],
                        'Toyota': ['Prius Prime'],
                        'Volkswagen': ['e-Golf'],
                        'Volvo': ['S90 T8 Twin Engine','XC60 T8 Twin Engine','XC90 T8 Twin Engine']
                    }
                },
                "2017": {
                    make: {
                        'Fiat': ['500e'],
                        'Ford': ['C-Max Energi'],
                        'Honda': ['Clarity Electric'],
                        'Hyundai': ['Sonata PHEV'],
                        'Mercedes': ['S550e']
                    }
                }
            }
        }

        var userCar = {
                year: '',
                make: '',
                model: ''
        };

        return(
            <div className='styled-select'>
                <select onChange={handleChange}>
                    <option value='select' selected>Year</option>
                    {Object.keys(cars.year).map(key => <option
                    value={key}
                    >{key}</option>)}
                </select>
            </div>
        );
    }
}

export default Radio;