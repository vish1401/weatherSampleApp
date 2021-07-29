import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: '',
      weatherData: null,
      sportData: [],
      click: ''
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  async getWeather() {
    if (this.state.countryName != '') {
      this.setState({ click: 'weather' });
      try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=f83519d24eb24d0abe5125304212707&q=${this.state.countryName}&aqi=no`);
        const json = await response.json();
        console.log('response--getWeather-', response)
        console.log('json--getWeather-', json)

        this.setState({ weatherData: json.current });
      } catch (error) {
        console.log(error);
      } finally {
        // this.setState({ isLoading: false });
      }
    } else {
      alert('Please enter Country name')
    }

  }
  async getSport() {
    if (this.state.countryName != '') {
      this.setState({ click: 'sport' });
      try {
        let response = await fetch(`http://api.weatherapi.com/v1/sports.json?key=f83519d24eb24d0abe5125304212707&q=${this.state.countryName}`);
        const json = await response.json();
        console.log('response--getSport-', response)
        console.log('json--getSport-', json)

        this.setState({ sportData: json.football });
      } catch (error) {
        console.log(error);
      } finally {

      }
    } else {
      alert('Please enter Country name')
    }
  }

  renderView() {
    if (this.state.click == 'weather' && this.state.weatherData) {
      console.log('this.state.weatherData---', this.state.weatherData)
      return (
        <View style={{ marginTop: 40, alignSelf: 'center' }}>
          <Text style={{ fontSize: 20 }}>{this.state.weatherData.condition.text}</Text>
          <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 20 }}>Temp - {this.state.weatherData.temp_c} `C</Text>
        </View>
      )
    } else if (this.state.click == 'sport' && this.state.sportData && this.state.sportData.length > 0) {
      return (
        <FlatList
          data={this.state.sportData}
          style={{ marginTop: 20, alignSelf: 'center' }}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text numberOfLines={2} style={{ width: '90%', alignSelf: 'center' }}>{item.match} - {item.start}</Text>
              </View>
            )
          }}
        />
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', height: 100, width: '100%', marginTop: 30, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ marginLeft: 30 }}>Country Name : </Text>
          <TextInput
            style={{ borderRadius: 10, height: 50, width: 200, borderWidth: 5, marginLeft: 20, padding: 10 }}
            value={this.state.countryName}
            onChangeText={(val) => this.setState({ countryName: val })}
          />
        </View>
        <TouchableOpacity onPress={() => this.getWeather()} style={{ borderRadius: 10, height: 50, width: 200, borderWidth: 5, alignSelf: 'center', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text>click here for weather</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.getSport()} style={{ borderRadius: 10, height: 50, width: 200, borderWidth: 5, alignSelf: 'center', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text>click here for Sports</Text>
        </TouchableOpacity>

        {this.renderView()}

      </SafeAreaView>
    );
  }
}
