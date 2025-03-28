import { StyleSheet, Text, View, ScrollView, FlatList,Pressable} from "react-native"
import { Modal } from "react-native-web"

export function RequestView(props) {
  return (
    <View>
    <Text>Current Requests</Text> 
    <Modal
    animationType="slide"
    transparent={false}
    visible={props.visible}
    onRequestClose={() => {
        props.setVisible(!props.visible);
    }}
    >  
        <View>
                    <Text>
                        {props.current?.hospitalId??""}
                    </Text>
                    <Text>
                        Urgency: {props.current?.urgency??""}, Blood Type: {props.current?.bloodType??""}
                    </Text>             
       
        </View>
    
    </Modal>
    <ScrollView style={styles.container}>
      <FlatList renderItem={(element) => {
        const req = element.item
        return (
            <View>
                <Pressable onPress = { () => {props.setCurrent(req); props.setVisible(true) } } >
                    <Text>
                        {req.hospitalId}
                    </Text>
                    <Text>
                        Urgency: {req.urgency}, Blood Type: {req.bloodType}
                    </Text>             
                </Pressable>
            </View>
        )
      }}
      data = {props.requestsArray}
      keyExtractor={(element) => {
        return element.id
      }}
        />


    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#780000",
    flex: 1,
  },
})
