import React, { useState } from 'react';
import { View, Linking, Text } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import BottomModal from './BottomModal';
import { ContactUs, Feedback } from '../src/components/Setting/Setting';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FABView = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const [showContact, setShowContact] = useState(false);

  const [index, setIndex] = useState(-1);

  const toggleModal = () => {
    setShowContact(false);
  };

  return (
    <>
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            small
            icon={open ? 'window-close' : 'information-variant'}
            color="#1772A6"
            actions={[
              {
                icon: 'file',
                label: '問卷調查',
                color: '#1772A6',
                onPress: () => {
                  Linking.openURL('https://forms.gle/8KRYFCjUquThbCNC6');
                },
              },
              {
                icon: 'comment-question-outline',
                label: '意見回饋',
                color: '#1772A6',
                onPress: () => {
                  setIndex(0);
                  setShowContact(true);
                },
              },
              {
                icon: 'face-agent',
                label: '聯絡我們',
                color: '#1772A6',
                onPress: () => {
                  setIndex(1);
                  setShowContact(true);
                },
              },
            ]}
            onStateChange={onStateChange}
            fabStyle={{ backgroundColor: '#fff' }}
          />
        </Portal>
        <BottomModal isVisible={showContact} toggleModal={toggleModal} style={{ backgroundColor: '#F8F8F8', height: hp('45%') }}>
          <View style={{ alignSelf: 'center', width: '30%', height: 1, borderWidth: 1, marginBottom: 10, borderColor: '#1772A6' }} />
          <View style={{ paddingBottom: 20 }}>
            {index === 0 ? (
              <Feedback
                content={{ borderColor: '#1772A6' }}
                contentFontColor={{ color: '#1772A6' }}
                wordCounterFontColor={{ color: '#1772A6' }}
                buttonColor={{ backgroundColor: '#2D9CDB' }}
                buttonTitle={{ color: '#fff' }}
              />
            ) : (
              <ContactUs titleColor={{ color: '#1772A6' }} />
            )}
          </View>
        </BottomModal>
      </Provider>
    </>
  );
};

export default FABView;
