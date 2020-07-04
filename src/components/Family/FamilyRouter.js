import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FamilyOverview } from "./FamilyOverview";
import FamilyRecordDetails from "./FamilyRecordDetails";

const FamilyStack = createStackNavigator();

export const FamilyRouter = (props) => {
  return (
    <FamilyStack.Navigator>
      <FamilyStack.Screen
        name="Family Records"
        component={FamilyRecordDetails}
      />
      <FamilyStack.Screen name="Family Overview" component={FamilyOverview} />
    </FamilyStack.Navigator>
  );
};
