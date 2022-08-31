import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import produce from 'immer';
import React, { FC, useCallback, useMemo, useState } from 'react';

import {
  ChannelType,
  MessageType,
  sectionBy,
  SectionCode,
  templateConfigs,
} from './constants';

const initFlow = [SectionCode.SelectMessageType, SectionCode.SelectChannelType];

interface MessageCardProps {
  onClose?: () => void;
}

interface Channel {
  type: string;
  subject?: string;
  body?: string;
}

type IMessageType = keyof typeof MessageType;

const MessageCard: FC<MessageCardProps> = ({ onClose }) => {
  const classes = useStyles();
  const [messageType, setMessageType] = useState<IMessageType>();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [sections, setSections] = useState(initFlow.map((code) => sectionBy[code]));

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const currentSection = useMemo(() => {
    return sections[currentSectionIndex];
  }, [currentSectionIndex, sections]);

  const _handleClickPrev = () => {
    const newCurrentSectionIndex = currentSectionIndex - 1;

    if (newCurrentSectionIndex >= 0) setCurrentSectionIndex(newCurrentSectionIndex);

    if (currentSection.code.includes('Preview')) {
      setCurrentChannelIndex((prev) => prev - 1);
    }
  };

  const _handleClickNext = () => {
    const newCurrentSectionIndex = currentSectionIndex + 1;

    let newSections = Array.from(sections);

    if (currentSection.code === SectionCode.SelectChannelType) {
      newSections = [
        ...sections.slice(0, newCurrentSectionIndex),
        ...channels.map((channel) => {
          return sectionBy[`Preview${channel.type}`];
        }),
      ];

      setChannels((channels) => {
        return channels.map((channel) => {
          const channelConfig = templateConfigs.find(
            (templateConfig) =>
              templateConfig.type === messageType &&
              templateConfig.channel === channel.type,
          )!;

          return {
            type: channel.type,
            body: channelConfig.body,
            subject: channelConfig.subject,
          };
        });
      });

      setSections(newSections);
      setCurrentChannelIndex(0);
    }

    if (currentSection.code.includes('Preview')) {
      setCurrentChannelIndex((prev) => prev + 1);
    }

    if (newCurrentSectionIndex <= newSections.length - 1)
      setCurrentSectionIndex(newCurrentSectionIndex);
  };

  const _handleChangeMessageType = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setMessageType(value as IMessageType);
  };

  const _handleChangeChannelItem = useCallback(
    ({ target: { checked, name } }: React.ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        const newChannels = [
          ...channels,
          {
            type: name,
            subject: '',
            body: '',
          },
        ];
        setChannels(
          [ChannelType.Email, ChannelType.Sms, ChannelType.Whatsapp]
            .map((channelType) => {
              return newChannels.find((channel) => channel.type === channelType)!;
            })
            .filter(Boolean),
        );
      } else {
        const newChannels = channels.filter((channel) => channel.type !== name);
        setChannels(newChannels);
      }
    },
    [channels],
  );

  const _handleChangeText = useCallback(
    ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
      setChannels((prevChannels) =>
        produce(prevChannels, (draftChannels) => {
          const channel = draftChannels[currentChannelIndex];

          channel[name as keyof Channel] = value;
        }),
      );
    },
    [currentChannelIndex],
  );

  const _handleSubmit = () => {
    const obj = {
      userIds: [],
      messageType,
      channels,
    };

    console.log('obj', obj);
  };

  const content = useMemo(() => {
    switch (currentSection.code) {
      case SectionCode.SelectMessageType: {
        return (
          <div>
            <RadioGroup value={messageType} onChange={_handleChangeMessageType}>
              {Object.values(MessageType).map((type) => {
                return (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                );
              })}
            </RadioGroup>
          </div>
        );
      }
      case SectionCode.SelectChannelType: {
        return (
          <div>
            <FormGroup>
              {Object.values(ChannelType).map((channelType) => {
                const checked = channels.some((channel) => channel.type === channelType);

                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={_handleChangeChannelItem}
                        name={channelType}
                      />
                    }
                    label={channelType}
                    key={channelType}
                  />
                );
              })}
            </FormGroup>
          </div>
        );
      }
      case SectionCode.PreviewEmail: {
        return (
          <div>
            <TextField
              onChange={_handleChangeText}
              value={channels[currentChannelIndex].subject}
              label="Asunto"
              name="subject"
            />
            <TextField
              onChange={_handleChangeText}
              label="Mensaje"
              value={channels[currentChannelIndex].body}
              name="body"
              multiline
            />
          </div>
        );
      }
      case SectionCode.PreviewWhatsapp: {
        return (
          <div>
            <TextField
              onChange={_handleChangeText}
              label="Mensaje"
              value={channels[currentChannelIndex].body}
              name="body"
              multiline
            />
          </div>
        );
      }
      case SectionCode.PreviewSms: {
        return (
          <div>
            <TextField
              onChange={_handleChangeText}
              label="Mensaje"
              value={channels[currentChannelIndex].body}
              name="body"
              multiline
            />
          </div>
        );
      }
      default: {
        return null;
      }
    }
  }, [
    _handleChangeChannelItem,
    _handleChangeText,
    channels,
    currentChannelIndex,
    currentSection.code,
    messageType,
  ]);

  return (
    <div className={classes.root}>
      <DialogTitle>{currentSection.title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {currentSectionIndex === 0 ? (
          <Button onClick={onClose}>Cancelar</Button>
        ) : (
          <Button onClick={_handleClickPrev}>Atrás</Button>
        )}
        {currentSectionIndex === sections.length - 1 &&
        currentSection.code !== SectionCode.SelectChannelType ? (
          <Button onClick={_handleSubmit}>Enviar</Button>
        ) : (
          <Button onClick={_handleClickNext}>Siguiente</Button>
        )}
      </DialogActions>
    </div>
  );
};

const useStyles = makeStyles(
  () => ({
    dialogContent: {
      flex: 1,
    },
    root: {
      width: 400,
    },
  }),
  { name: 'MessageCard' },
);

export default MessageCard;
