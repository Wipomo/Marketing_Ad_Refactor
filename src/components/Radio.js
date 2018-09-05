import React from 'react';

const cars = {
    year: {
        "2019": {
            make: {
                'BMW': ['i8 Coupe','i8 Roadster'],
                'Ford': ['Fusion Energi - Titanium'],
                'Hyundai': ['IONIQ Electric', 'IONIQ Plug-in Hybrid', 'Kona Electric'],
                'Land Rover': ['Range Rover P400e','Range Rover Sport P400e'],
                'Porsche': ['Cayenne E-Hybrid'],
                'Volvo': ['S60 T8 Twin Engine']
            }
        },
        "2018": {
            make: {
                'Audi': ['A3 Sportback e-tron'],
                'BMW': ['330e iPerformance','530e iPerformance','530e xDrive iPerformance','740e xDrive iPerformance','i3','i3 REx','i3s','i3s REx','X5 xDrive40e'],
                'Cadillac': ['CT6 PHEV'],
                'Chevrolet': ['Bolt EV','Volt'],
                'Chrysler': ['Pacifica Hybrid'],
                'Ford': ['Focus Electric', 'Fusion Energi'],
                'Honda': ['Clarity Electric', 'Clarity Plug-in Hybrid'],
                'Hyundai': ['IONIQ Electric', 'IONIQ Plug-in Hybrid', 'Sonata PHEV'],
                'Karma': ['Revero'],
                'Kia': ['Niro PHEV', 'Optima PHEV', 'Soul EV'],
                'Mercedes': ['C350e', 'GLC 350e','GLE 550e'],
                'MINI': ['Cooper S E Countryman ALL4'],
                'Mitsubishi': ['Outlander PHEV'],
                'Nissan': ['LEAF (40kWh)'],
                'Porsche': ['Cayenne S E-Hybrid','Panamera 4 E-Hybrid','Panamera Turbo S E-Hybrid'],
                'smart': ['fortwo ED Cabrio','fortwo ED Coupe'],
                'Tesla': ['Model 3 Standard','Model 3 Long Range','Model 3 LR AWD','Model 3 LR AWD Performance','Model S 75D','Model S 100D','Model S P100DL','Model X 75D','Model X 100D','Model X P100DL'],
                'Toyota': ['Prius Prime'],
                'Volkswagen': ['e-Golf'],
                'Volvo': ['S90 T8 Twin Engine','XC60 T8 Twin Engine','XC90 T8 Twin Engine']
            }
        },
        "2017": {
            make: {
                'Audi': ['A3 Sportback e-tron'],
                'BMW': ['330e','530e','740e','i3 BEV','i3 REx','i8','X5 xDrive40e'],
                'Cadillac': ['CT6 PHEV','ELR'],
                'Chevrolet': ['Bolt EV','Spark EV','Volt'],
                'Chrysler': ['Pacifica Hybrid'],
                'Fiat': ['500e'],
                'Ford': ['C-Max Energi','C-Max Energi','Focus Electric','Fusion Energi'],
                'Honda': ['Clarity BEV','Clarity PHEV'],
                'Hyundai': ['IONIQ EV','Sonata PHEV'],
                'Kia': ['Optima PHEV','Soul EV'],
                'Mercedes': ['B250e','C350e','GLE 550e','S550e'],
                'MINI': ['Countryman SE PHEV'],
                'Mitsubishi': ['i-MiEV','Outlander PHEV'],
                'Nissan': ['Leaf'],
                'Porsche': ['Cayenne S E','Panamera E-Hybrid'],
                'smart': ['ED'],
                'Tesla': ['Model 3','Model S','Model X'],
                'Toyota': ['Prius Prime'],
                'Volkswagen': ['e-Golf'],
                'Volvo': ['S90 T8 PHEV','XC60 PHEV','XC90 T8 PHEV']
            }
        },
        "2016": {
            make: {
                'Audi': ['A3 Sportback e-tron'],
                'BMW': ['330e','740e','i3','i8','X5 xDrive40e'],
                'Cadillac': ['ELR'],
                'Chevrolet': ['Bolt EV','Spark EV','Volt'],
                'Fiat': ['500e'],
                'Ford': ['C-Max Energi','Focus Electric','Fusion Energi'],
                'Hyundai': ['Sonata PHEV'],
                'Kia': ['Soul EV'],
                'Mercedes': ['B250e','C350e','GLE 550e','S550H PHEV'],
                'Mitsubishi': ['i-MiEV'],
                'Nissan': ['Leaf'],
                'Porsche': ['Cayenne S-E','Panamera S-E'],
                'smart': ['ED'],
                'Tesla': ['Model S','Model X'],
                'Toyota': ['Prius PHEV','Prius Prime'],
                'Volkswagen': ['e-Golf'],
                'Volvo': ['XC90']
            }
        },
        "2015": {
            make: {
                'Audi': ['A3 Sportback e-tron'],
                'BMW': ['i3','i8','X5 xDrive40e'],
                'Cadillac': ['ELR'],
                'Chevrolet': ['Spark EV','Volt'],
                'Fiat': ['500e'],
                'Ford': ['C-Max Energi','Focus Electric','Fusion Energi'],
                'Honda': ['Accord PHEV'],
                'Hyundai': ['Sonata PHEV'],
                'Kia': ['Soul EV'],
                'Mercedes': ['B-Class ED','S550 PHEV'],
                'Mitsubishi': ['i-MiEV'],
                'Nissan': ['Leaf'],
                'Porsche': ['918 Spyder','Cayenne S-E','Panamera S-E'],
                'smart': ['ED'],
                'Tesla': ['Model S','Model X'],
                'Toyota': ['Prius PHEV'],
                'Volkswagen': ['e-Golf'],
                'Volvo': ['XC90']
            }
        },
        "2014": {
            make: {
                'BMW': ['i3','i8'],
                'Cadillac': ['ELR'],
                'Chevrolet': ['Spark EV','Volt'],
                'Fiat': ['500e'],
                'Ford': ['C-Max Energi','Focus Electric','Fusion Energi'],
                'Honda': ['Accord PHEV','Fit EV'],
                'Kia': ['Soul EV'],
                'Mercedes': ['B-Class ED'],
                'Mitsubishi': ['i-MiEV'],
                'Nissan': ['Leaf'],
                'Porsche': ['Cayenne S-E','Panamera S-E'],
                'smart': ['ED'],
                'Tesla': ['Model S'],
                'Toyota': ['Prius PHEV','RAV4 EV'],
                'Volkswagen': ['e-Golf']
            }
        },
        "2013": {
            make: {
                'Cadillac': ['ELR'],
                'Chevrolet': ['Spark EV','Volt'],
                'Fiat': ['500e'],
                'Ford': ['C-Max Energi','Focus Electric','Fusion Energi'],
                'Honda': ['Accord PHEV','Fit EV'],
                'Mitsubishi': ['i-MiEV'],
                'Nissan': ['Leaf'],
                'Porsche': ['Panamera S-E'],
                'smart': ['ED'],
                'Tesla': ['Model S'],
                'Toyota': ['Prius PHEV', 'RAV4 EV']
            }
        },
        "2012": {
            make: {
                'Chevrolet': ['Volt'],
                'Ford': ['C-Max Energi','Focus Electric'],
                'Honda': ['Fit EV'],
                'Mitsubishi': ['i-MiEV'],
                'Nissan': ['Leaf'],
                'Tesla': ['Model S'],
                'Toyota': ['Prius PHEV','RAV4 EV']
            }
        }
    }
}

var test = '';

class Radio extends React.Component {
    
    render() {



        return(
            <div className='styled-select'>
                <select onChange={this.handleChange}>
                    <option>Year...</option>
                    <option value='2017'>2017</option>
                </select>
                <select>
                    <option>Make...</option>
                </select>
                <select>
                    <option>Model...</option>
                </select>

            </div>
        );
    }
}



export default Radio;