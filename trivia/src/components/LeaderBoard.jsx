import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';  //https://github.com/jerairrest/react-chartjs-2
// import Timer from "react.timer"; // https://github.com/rogermarkussen/react.timer
import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database";

const names = ["Eight", "Three", "Six", "Four", "Nine", "Six", "Eight", "Ten", "Six", "Three"];
const scores = [8, 3, 6, 4, 9, 6, 8, 10, 6, 3];

export default class LeaderBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: props.chartData,
            
        }
    }

    static defaultProps = {
        displayTitle: true
        //displayLegend: true
    }

    componentWillMount(){
        this.getChartData();
    }
    
    // Create a random color for each bar - might be unneccesary or should live with player creation
    makeRandomColor(){
        var color = "";
        while (color.length < 7) {
          color += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return "#" + color;
    }

    getChartData(){
        var dateobj= new Date() ;
        var month = dateobj.getMonth() + 1;
        var day = dateobj.getDate() ;
        var year = dateobj.getFullYear();
        // let dataRef = firebase.database().ref(month+"-"+day+"-"+year +'/').on();
        // dataRef.on()
        this.setState({
            chartData: {
                // labels - array that houses player names
                labels: names,
                datasets: [
                    {
                    label: 'Score',
                    // data - array of player scores
                    data: scores,
                    // backgroundColor - Array of color values assigned to players - COULD THIS BE CREATED AND STORED AT USER CREATION TIME?
                    backgroundColor: "orange"
                    }
                ]
            }
        });
    }

    render(){
        return (
            <div className="container leaderboard">
                <div className="chart">
                    <HorizontalBar
                        data={this.state.chartData}
                        width={75}
                        height={50}
                        options={{
                            //maintainAspectRatio: true,
                            title:{
                                display: this.props.displayTitle,
                                text:"Today's Trivia Leaderboard",
                                fontSize: 25
                            },
                            legend:{
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            },
                            tooltips:{
                                opacity: 0,
                                displayColors: false,
                            },
                            scales: {
                                yAxes: [{
                                barPercentage: 0.9,
                                gridLines: {
                                    display: false
                                }
                                }],
                                xAxes: [{
                                gridLines: {
                                    zeroLineColor: "black",
                                    zeroLineWidth: 2,
                                },
                                // Ticks should vary based on day/week/overall
                                // Day min:0, max:10, stepSize: 1
                                // Week min:0, max:70, stepSize: 7
                                // Overall min:0, max: highest score, stepSize: highest score / 10
                                ticks: {
                                    min: 0,
                                    max: 10,
                                    stepSize: 1
                                }
                                }]
                            },
                            layout: {
                                padding: {
                                    left: 50,
                                    right: 50,
                                    top: 0,
                                    bottom: 0
                                }
                            }
                        }}
                        />
                    </div>
                {/* <div className="row justify-content-end">
                        <button type="button" class="col-2 btn btn-info btn-sm">Daily</button>
                        <button type="button" class="col-2 btn btn-info btn-sm">Weekly</button>
                </div> */}
            </div>
        )
    }
}