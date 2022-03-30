import { useState } from 'react';
import { Stack, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { GeoCoder } from 'react-google-maps';

const Searcher = ({ setCenter }) => {
console.log("🚀 ~ file: Searcher.js ~ line 7 ~ Searcher ~ setCenter", setCenter)
  // const { setCenter } = props;
  
  const google = window.google;
  let geocoder = new google.maps.Geocoder;

  const [address, setAddress] = useState('');

  const onSearch = () => {
    geocoder
      .geocode({ address })
      .then(result => {
        const { results } = result;
        const firstResult = results[0];
        const location = firstResult.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setCenter({ lat, lng });
      })
      .catch(e => {
        alert('Geocode was not successful for the following reason: ' + e);
      });
  };

  return (
    <>
      {/* <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={onSearch}>Buscar</button>
    </> */}

      <Stack
        display={'flex'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <InputGroup width={'70%'}>
          <Input
            placeholder="Search Here"
            type={'text'}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <InputRightElement
            children={<SearchIcon color="green.500" onClick={onSearch} />}
          />
        </InputGroup>
      </Stack>
    </>
  );
};

export default Searcher;
