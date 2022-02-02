import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function MenuBar(props) {
  const loggedUser = props.loggedUser;
  const routing = useRouter();

  return (
    <>
      <Box styleSheet={{
          minWidth: {
              xs: 'auto',
              lg: '60px'},
          maxWidth: {
              xs: '',
              lg: '60px'
          },
          minHeight: {
              xs: '60px',
              lg: 'auto'},
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '2px',
          backgroundColor: appConfig.theme.colors.neutrals[800],
          boxShadow: 'rgba(4, 4, 5, 0.5) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 2px 5px 5px 0px',
          backgroundColor: appConfig.theme.colors.neutrals['300'],
          border: '1px solid',
          borderColor: appConfig.theme.colors.neutrals['400'],
          padding: '2px',
          marginRight: '16px'
      }}>
          <Box styleSheet={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '3px',
          backgroundColor: '',border: '1px solid',
          borderColor: appConfig.theme.colors.neutrals['400'],
          borderTopColor: appConfig.theme.colors.neutrals['900'],
          }}>

              <Box
              rounded='none'
              onClick={(event) => {
                routing.push(`/chat?username=${loggedUser}`);
              }}
              styleSheet={{
                  backgroundColor: appConfig.theme.colors.neutrals['300'],
                  borderRadius: '2px',
                  border: '1px solid',
                  borderTopColor: appConfig.theme.colors.neutrals['400'],
                  borderLeftColor: appConfig.theme.colors.neutrals['400'],
                  borderRightColor: appConfig.theme.colors.neutrals['400'],
                  borderBottomColor: appConfig.theme.colors.neutrals['400'],
                  boxShadow: 'inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)',
                  width: '52px',
                  height: '52px',
                  backgroundImage: 'url(/static/images/chat-icon-64.png)',
                  backgroundSize: '24px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  transition: 'all 0.1s',
                  cursor: 'pointer',
                  hover: {
                      backgroundColor: appConfig.theme.colors.neutrals['200'],
                  },
              }}/>    

              <Box
              rounded='none'
              onClick={(event) => {
                routing.push(`/profile?username=${loggedUser}`);
              }}
              styleSheet={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: appConfig.theme.colors.neutrals['300'],
                  borderRadius: '2px',
                  border: '1px solid',
                  borderTopColor: appConfig.theme.colors.neutrals['400'],
                  borderLeftColor: appConfig.theme.colors.neutrals['400'],
                  borderRightColor: appConfig.theme.colors.neutrals['400'],
                  borderBottomColor: appConfig.theme.colors.neutrals['400'],
                  boxShadow: 'inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)',
                  width: '52px',
                  height: '52px',
                  transition: 'all 0.1s',
                  cursor: 'pointer',
                  hover: {
                      backgroundColor: appConfig.theme.colors.neutrals['200'],
                  },
              }}>
                  <Image
                  styleSheet={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '1px',
                      border: '1px solid',
                      borderColor : appConfig.theme.colors.neutrals[400],
                      display: 'block',
                  }}
                  src={`https://github.com/${loggedUser}.png`}/>
              </Box>

              <Box
              rounded='none'
              styleSheet={{
                  backgroundColor: appConfig.theme.colors.neutrals['300'],
                  borderRadius: '2px',
                  border: '1px solid',
                  borderTopColor: appConfig.theme.colors.neutrals['400'],
                  borderLeftColor: appConfig.theme.colors.neutrals['400'],
                  borderRightColor: appConfig.theme.colors.neutrals['400'],
                  borderBottomColor: appConfig.theme.colors.neutrals['400'],
                  boxShadow: 'inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)',
                  width: '52px',
                  height: '52px',
                  backgroundImage: 'url(/static/images/about-icon-64.png)',
                  backgroundSize: '24px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  transition: 'all 0.1s',
                  cursor: 'pointer',
                  hover: {
                      backgroundColor: appConfig.theme.colors.neutrals['200'],
                  },
              }}/>    

          </Box>

      </Box>
    </>
  )
}