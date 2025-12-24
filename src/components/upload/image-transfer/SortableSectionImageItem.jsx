import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import { PiDotsSixVertical } from 'react-icons/pi';
import { toDisplayImage, getUniqueId, formatImageUrl, getFilenameFromUrl } from './transferUtils.js';

export default function SortableSectionImageItem({ item, checked, onToggle, showOrder }) {
    const uniqueId = getUniqueId(item);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: uniqueId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 999 : 'auto',
    };

    const image = toDisplayImage(item);
    const labelId = `transfer-list-item-${uniqueId}-label`;
    const isChecked = checked.some((x) => getUniqueId(x) === uniqueId);

    return (
        <ListItem
            ref={setNodeRef}
            style={style}
            secondaryAction={
                // Drag Handle
                <IconButton
                    size="small"
                    {...attributes}
                    {...listeners}
                    sx={{ cursor: 'grab' }}
                    aria-label="drag handle"
                >
                    <PiDotsSixVertical />
                </IconButton>
            }
            disablePadding
        >
            {/* Clickable Area for Selection */}
            <ListItemButton
                onClick={() => onToggle(item)}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={isChecked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>

                <ListItemAvatar>
                    <Avatar
                        variant="square"
                        src={formatImageUrl(image?.url)}
                        alt={image?.title}
                        sx={{ width: 50, height: 50, mr: 1, borderRadius: 1 }}
                    />
                </ListItemAvatar>

                <ListItemText
                    id={labelId}
                    primary={
                        <>
                            {showOrder && (
                                <span style={{ fontWeight: 700, marginRight: 8 }}>
                                    {item.order}
                                </span>
                            )}
                            {getFilenameFromUrl(image?.url)}
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
}
