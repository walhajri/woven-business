import React, {Component} from 'react';
import {FlatList, View, Text, Image} from 'react-native';
import getPositions from '../../data/firestore/businessJobs';
import {ListItem, Separator} from '../../components/List';
import {Container} from '../../components/Container';
import assetsObject from '../../assets/assets';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';


Icon.loadFont();
class HomeBusiness extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }

    // this will fire every time AppliedJob receives navigation focus
    this.props.navigation.addListener('willFocus', () => {
      this.componentDidMount()
    })
  }
  static navigationOptions = ({navigation}) => ({
    headerRight: () => (
      <Button
        style={{
          marginRight: 10,
          fontWeight: 'bold',
        }}
        onPress={() => {
          navigation.navigate('AddPosition');
        }}
        icon={<Icon type="material" name="plus" size={20} color="white" />}
        color="#fff"
      />
    ),
  });
  handlePress = item => {
    console.log('hi');
  };

  state = {
    positions: [],
    empty: true,
  };

  async componentDidMount() {
    var positions = await getPositions();
    this.setState({
      positions: positions,
      empty: true,
    });
    if(positions.length > 0) {
      this.setState({
        empty:false,
      });
    }
  }

  render() {
    if(!this.state.empty){
        return (
          <Container>
            <View>
              <FlatList
                data={this.state.positions}
                renderItem={({item}) => (
                  <ListItem
                    img={item.img}
                    jobTitle={item.jobTitle}
                    jobLocation={item.jobLocation}
                    jobTotalSalary={item.jobTotalSalary}
                    jobCompany={item.jobCompany}
                    onPress={() => this.handlePress(item)}
                    jobDays={item.jobDays}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={Separator}
              />
            </View>
          </Container>
        );
      } else {
        //TODO: unify all text in one place
        return (
          <Container>
            <Text style={styles.textStyle}>You didn't add any job</Text>
            <Image
              source={assetsObject.emptyJob}
              style={styles.logo}
              resizeMode="contain"
            />
          </Container>
        );
      }
  }
}
const styles = EStyleSheet.create({
  text: {
    color: '$textColor',
  },
  textStyle: {
    marginTop: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});
export default HomeBusiness;
