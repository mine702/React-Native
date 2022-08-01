import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Provider ,Appbar ,Title,Paragraph , BottomNavigation} from 'react-native-paper';

const MyComponent = () => {

  const MusicRoute = () => <Text style="{styles.title}">Music</Text>;
  const AlbumsRoute = () => <Text style="{styles.title}">Albums</Text>;
  const RecentsRoute = () => <Text style="{styles.title}">Recents</Text>;
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'music',color: '#795548' },
    { key: 'albums', title: 'Albums', icon: 'album', color: '#607D8B' },
    { key: 'recents', title: 'Recents', icon: 'history', color: '#3F51B5' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });
  return (
    <Provider>
    <Appbar.Header>
      <Appbar.Content title="Mywebtuts" />
    </Appbar.Header>
     <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </Provider>
  );
};
export default MyComponent;