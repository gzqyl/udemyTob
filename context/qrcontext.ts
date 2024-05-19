import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { createContext, useEffect, useState } from "react";

export const QRContext = createContext<NativeStackNavigationProp<any, string, undefined> | null>(null)