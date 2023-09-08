
// import { createDrawerNavigator } from '@react-navigation/drawer';
// const TutorDrawerRoutes = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} role="Instructor" />}
//       screenOptions={{
//         headerShown: false,
//         drawerActiveBackgroundColor: '#302C54',
//         drawerActiveTintColor: '#fff',
//         drawerInactiveTintColor: '#333',
//         drawerLabelStyle: { fontSize: 15, marginLeft: -25 },
//       }}>
//       <Drawer.Screen
//         name="Dashboard"
//         component={TutorDashboardScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="My Classes"
//         component={MyClassScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="Account Setting"
//         component={TutorEditProfileScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="Reset Password"
//         component={TutorResetPassword}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="Manage Classes"
//         component={CalendarScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };
// const StudentDrawerRoutes = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} role="Student" />}
//       screenOptions={{
//         headerShown: false,
//         drawerActiveBackgroundColor: '#302C54',
//         drawerActiveTintColor: '#fff',
//         drawerInactiveTintColor: '#333',
//         drawerLabelStyle: { fontSize: 15, marginLeft: -25 },
//       }}>
//       <Drawer.Screen
//         name="Dashboard"
//         component={StudentDashboardScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="Enrolled Classes"
//         component={EnrolledClassScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="Account Setting"
//         component={StudentEditProfileScreen}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//       <Drawer.Screen
//         name="Reset Password"
//         component={StudentResetPassword}
//         options={{
//           drawerIcon: ({ color }) => {
//             return (
//               <MaterialCommunityIcons
//                 name="view-dashboard"
//                 size={22}
//                 color={color}
//               />
//             );
//           },
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };