import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Modal, Button, TouchableHighlight, ScrollView } from 'react-native';
import Communications from 'react-native-communications';

export default class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            description: 'Description',
            type: 'Type',
            ammoType: 'Ammo type',
            weight: 'Weight',
            price: 'Price',
            mainModalVisible: false,
            itemsCount: 0,
            currentWeapon: -1,
            selected: false,
            weapons: [{key: "sfsjgdf", id: 1, type: "semiauto", ammoType: 5, weight: 300, price: 500,},
                {key: "sfsjgdfgdf", id: 2, type: "auto", ammoType: 4, weight: 200, price: 100,},
                {key: "dsbfya", id: 3, type: "auto", ammoType: 5, weight: 250, price: 200,},
                {key: "hgnufd", id: 4, type: "semiauto", ammoType: 6, weight: 700, price: 1000,},
            ],

        }
    }

	setmainModalVisible(visible) {
        this.setState({mainModalVisible: visible});
    }
	resetState() {
        this.state.description = 'Description';
        this.state.type = 'Type';
        this.state.ammoType = 'Ammo Type';
        this.state.Weight = 'Weight';
        this.state.Price = 'Price';
    }
	
	isInArray(description) {
        var count = this.state.weapons.length;
        for(var i = 0; i < count ; i++) {
            if(this.state.weapons[i].key === description) {
                return i;
            }
        }
        return -1;
    }
	
	updateWeapon(index) {
        this.state.weapons[index].key = this.state.description;
        this.state.weapons[index].type = this.state.type;
        this.state.weapons[index].ammoType = this.state.ammoType;
        this.state.weapons[index].weight = this.state.weight;
        this.state.weapons[index].price = this.state.price;

    }
	
	getStateText() {
        return "Weapon: Description=" + this.state.description +
               ", Type=" + this.state.type +
               ", AmmoType=" + this.state.ammoType +
               ", Weight=" + this.state.weight +
               ", Price=" + this.state.price;
    }
	
	addToWeapons() {
        if(this.state.description !== 'Description' && this.state.type !== 'Type' &&
            this.state.ammoType !== 'Ammo Type' && this.state.weight !== 'Weight' && this.state.price !== 'Price') {

            var index = this.isInArray(this.state.description);
            if(index !== -1) {
                return "already exists";
            }
            this.state.itemsCount = this.state.itemsCount+1;
            this.state.weapons.push({
                key: this.state.description,
                id: this.state.itemsCount,
                type: this.state.type,
                ammoType: this.state.ammoType,
                weight: this.state.weight,
                price: this.state.price
            });
            return "ok";
        }
        else {
            return "invalid data";
        }

    }

    setStateAccordingToData(item) {
        this.state.description = item.key;
        this.state.type = item.type;
        this.state.ammoType = item.ammoType.toString();
        this.state.weight = item.weight.toString();
        this.state.price = item.price.toString();
    }
	
  render() {
	  this.state.itemsCount = this.state.weapons.length;
    return (
      <View style={styles.container}>
        <ScrollView>
                  <FlatList
                      data={this.state.weapons}
                      renderItem={
                          ({item}) => <View>
                              <Text style={{fontSize:20, color:"blue"}}>
                                  {item.key}, {item.ammoType}, {item.type}</Text>
                              <Button
                                  title={"View/Edit"}
                                  onPress={() => {
                                      this.setmainModalVisible(!this.state.mainModalVisible);
                                      this.setStateAccordingToData(item);
                                  }}>
                              </Button>

                                        </View>

                      }
                      extraData = {this.state}
                  >
                  </FlatList>
              </ScrollView>

			  <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.mainModalVisible}
                  onRequestClose={() => {alert("Main Modal was closed"); this.setmainModalVisible(!this.state.mainModalVisible); this.resetState()}}
              >
                  <ScrollView>
                  <View style={{marginTop: 22}}>
                      <View>
                          <TextInput style={styles.inputText} onChangeText={(description) => this.setState({description})}
                                     value={this.state.description}
                          />
                          <TextInput style={styles.inputText} onChangeText={(type) => this.setState({type})}
                                     value={this.state.type}
                          />
                          <TextInput style={styles.inputText} onChangeText={(ammoType) => this.setState({ammoType})}
                                     value={this.state.ammoType}
                          />
                          <TextInput style={styles.inputText} onChangeText={(weight) => this.setState({weight})}
                                     value={this.state.weight}
                          />
                          <TextInput style={styles.inputText} onChangeText={(price) => this.setState({price})}
                                     value={this.state.price}
                          />
                          <Button
                          title={"Add new weapon/Edit existing weapon"}
                          onPress={() => {
                              this.setmainModalVisible(!this.state.mainModalVisible);
                              var result = this.addToWeapons();
                              if(result === "invalid data") {
                                  alert("New data should not contain input text placeholders.");
                              }
                              else if(result === "already exists") {
                                  this.updateWeapon(this.isInArray(this.state.description));
                                  alert("Updated weapon with description " + this.state.description);
                              }
                              else {
                                  Communications.email(['santejudean.bogdan@gmail.com', 'santejudean.bogdan@gmail.com'],null,null,'New Weapon ADDED-WeaponTool', this.getStateText());
                              }
                          }}>
                      </Button>

                      </View>
                  </View>
                  </ScrollView>
              </Modal>

          <TouchableHighlight
              style={styles.holder}
              onPress={() => {
                  this.setmainModalVisible(true);
              }}>
              <Text>Add Weapon Form</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop:50,
      marginLeft: -60,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
    welcomeText: {
        marginLeft:60,
    },
    inputText: {
      width: 300,
        marginBottom: 70,
        marginLeft: 40,
    },
    holder: {
        marginBottom: 40,
        marginLeft: 50,
    },
});
