import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function SendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: {
            xs: '',
            md: 'relative'
        },
        
        marginLeft: '8px',
      }}>

      <Button 
      fullWidth
      rounded='none'
      styleSheet={{
          backgroundColor: appConfig.theme.colors.neutrals['100'],
          borderRadius: '2px',
          border: '1px solid',
          height: '30px',
          width: '30px',
          borderTopColor: appConfig.theme.colors.neutrals['400'],
          borderLeftColor: appConfig.theme.colors.neutrals['400'],
          borderRightColor: appConfig.theme.colors.neutrals['400'],
          borderBottomColor: appConfig.theme.colors.neutrals['400'],
          boxShadow: 'inset 2px 3px 1px 0px rgba(255,255,255,1), inset -2px -3px 1px 0px rgba(0,0,0,0.16)',
          paddingTop: '6px',
          paddingBottom: '6px',
          backgroundImage: 'url(/static/images/smile-icon-32.png)',
          backgroundSize: '16px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["900"],
            mainColor: appConfig.theme.colors.neutrals['100'],
            mainColorLight: appConfig.theme.colors.neutrals['100'],
            mainColorStrong: appConfig.theme.colors.neutrals['200'],
          }}
        label=""
        onClick={() => setOpenState(!isOpen)}
        />
        {isOpen && (
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '2px',
              position: 'absolute',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              width: {
                xs: '105%',
                sm: '290px',
              },
              height: '300px',
              right: '-2.5%',
              bottom: {
                  xs: '20%',
                  md: '30px'
              },
              boxShadow: 'rgba(4, 4, 5, 0.5) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 2px 5px 5px 0px',
              backgroundColor: appConfig.theme.colors.neutrals['300'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['400'],
              padding: '2px',
            }}
            onClick={() => setOpenState(false)}
          >
              <Box styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  padding: '16px',
                  backgroundColor: appConfig.theme.colors.neutrals[100],border: '1px solid',
                  borderColor: appConfig.theme.colors.neutrals['400'],
                  borderTopColor: appConfig.theme.colors.neutrals['900'],
              }}>

            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals["700"],
                fontWeight: 'normal',
              }}
            >
              Stickers
            </Text>
            <Box styleSheet={{
                display: 'flex', flex: 1,
                paddingTop: '16px', overflow: 'hidden',

            }}>
            <Box
              tag="ul"
              styleSheet={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                flex: 1,
                overflowY: 'scroll',
              }}
            >
              {appConfig.stickers.map((sticker) => (
                <Text
                  onClick={() => {
                    const stickerCode = ':sticker:' + sticker;
                    if (Boolean(props.onStickerClick)) {
                      props.onStickerClick(stickerCode);
                    }
                  }}
                  tag="li" key={sticker}
                  styleSheet={{
                    width: '50%',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Image src={sticker} />
                </Text>
              ))}
            </Box>
            </Box>
              </Box>
          </Box>
        )}
    </Box>
  )
}