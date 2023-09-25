import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

function ModalTester({
    bodyComponent, isModalVisible=true, handleClose,height
}) {

 

  return (
    <View style={{ flex: 1,height:300}}>
   

      <Modal isVisible={isModalVisible}
       animationInTiming={500}
       animationOutTiming={10}
       backdropOpacity={0.2}
       swipeDirection={['down']}
       onSwipeComplete={handleClose}
       onBackdropPress={handleClose}
       animationIn="fadeInUp"
       animationOut="fadeInDown"
       panGestureEnabled // Enable pan gesture for dragging
       swipeThreshold={50}
      >
        <View style={{backgroundColor:'white'}}>
          {bodyComponent}
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;