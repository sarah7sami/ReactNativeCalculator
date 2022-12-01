import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, TextInput, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Entypo name="home" size={24} color="black"  />
        ),
      }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-details" size={24} color="black" />
        ),
      }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  const[isEnabled, setIsEnabled] = React.useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // set $unit to square meters if isEnabled is true and square feet if isEnabled is false
  const unit = isEnabled ? "square meters" : "square feet";

  const [flooringPrice, setFlooringPrice] = React.useState(0);
  const [flooringInstallation, setFlooringInstallation] = React.useState(0);
  const [roomSize, setRoomSize] = React.useState(0);

  const calculateFlooring = () => {
    return roomSize * flooringPrice;
  }

  const calculateInstallation = () => {
    return roomSize * flooringInstallation;
  }

  const calculateTotalCost = () => {
    return calculateFlooring() + calculateInstallation();
  }

  const calculateTax = () => {
    return (calculateTotalCost() * 0.13);
  }

  const [flooringCost, setFlooringCost] = React.useState(0);
  const [installationCost, setInstallationCost] = React.useState(0);
  const [totalCost, setTotalCost] = React.useState(0);
  const [tax, setTax] = React.useState(0);

  onSubmit = () => {
    setFlooringCost(calculateFlooring());
    setInstallationCost(calculateInstallation());
    setTotalCost(calculateTotalCost());
    setTax(calculateTax());
  }
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={[styles.title]}>Calculate Flooring Prices</Text>
      <View style={styles.lineStyle} />

      {/* wrap the switch and text to be on the same line */}
      <View>
        <View style={{flexDirection: 'row'}}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={[{marginTop: 13}, styles.whiteText]}>{isEnabled ? "Square Meters" : "Square Feet"}</Text>
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            {/*  wrap text in another view and make it take up 2/3 of the screen from the left side */}
            <View style={{width: '50%'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>Size of the room:</Text>
            </View>

            <View style={{marginLeft: 20, width: '20%'}}>
              <TextInput
                onChangeText={text => setRoomSize(text)}
                style={[{height: 20, borderColor: 'gray', borderWidth: 1, width: 100, marginLeft: 10, marginTop: 20}, styles.whiteText]}
                keyboardType='numeric'
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>{`Price per ${unit}:`}</Text>
            </View>

            <View style={{marginLeft: 20, width: '20%'}}>
              <TextInput
                onChangeText={text => setFlooringPrice(text)}
                style={[{height: 20, borderColor: 'gray', borderWidth: 1, width: 100, marginLeft: 10, marginTop: 20} , styles.whiteText]}
                keyboardType='numeric'
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>{`Price per ${unit} of flooring installation:`}</Text>
            </View>

            {/* // wrap the text input in another view and make it take up 1/3 of the screen from the right side */}
            <View style={{marginLeft: 20, width: '20%'}}>
              <TextInput
                onChangeText={text => setFlooringInstallation(text)}
                style={[{height: 20, borderColor: 'gray', borderWidth: 1, width: 100, marginLeft: 10, marginTop: 20}, styles.whiteText]}
                keyboardType='numeric'
              />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Button
              title="Submit"
              onPress={onSubmit}
              color="#841584"
              accessibilityLabel="Calculate"
            />
          </View>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>Installation cost before tax:</Text>
              {/* if variable not empty : variable else show '-' */}
              {!!installationCost && <Text style={[{marginTop: 20, marginLeft: 20}, styles.whiteText]}>{`$${installationCost.toFixed(2)}`}</Text>}
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>Flooring cost before tax:</Text>
              {!!flooringCost && <Text style={[{marginTop: 20, marginLeft: 20}, styles.whiteText]}>{`$${flooringCost.toFixed(2)}`}</Text>}
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>Total cost (installation + flooring) before tax:</Text>
              {!!totalCost && <Text style={[{marginTop: 20, marginLeft: 20}, styles.whiteText]}>{`$${totalCost.toFixed(2)}`}</Text>}
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={[{marginTop: 20}, styles.whiteText]}>Tax:</Text>
              {!!tax && <Text style={[{marginTop: 20, marginLeft: 20}, styles.whiteText]}>{`$${tax.toFixed(2)}`}</Text>}
            </View>
          </View>
        </View>    
      </View>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Information</Text>
      <View style={styles.lineStyle} />
      <Text style={styles.whiteText}>Name: Sarah Sami</Text>
      <Text style={styles.whiteText}>Student ID: 101334588</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },

  lineStyle:{
    borderWidth: 0.5,
    borderColor:'white',
    margin:10,
    width: 300,
  },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },

  whiteText: {
    color: 'white',
  },

  navStyle: {
    backgroundColor: 'purple',
  },
});
