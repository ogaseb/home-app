import styled from "styled-components";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { useVideos } from "@hooks/youtube_videos";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";
import { ProgressSpinner } from "@components/progress/progress";

const StyledDialog = styled(Dialog)`
	&& {
		& .MuiDialog-container > div {
			background-color: ${({ theme }) => theme.colors.primary};
			max-width: unset;
		}
   
	}
`;

const StyledDialogContent = styled(DialogContent)`
	&& {
		color: white;
    padding: 0;

    & > li:nth-child(even) {
		  background-color: #171717;
	  } 
	}
`;

const StyledYoutube = styled(YouTube)`
	&& {
		width: 100%;
		height: 100%;
		color: white;

		& > iframe {
			width: 100%;
			height: 100%;
		}
	}
`;

const StyledListItemText = styled(ListItemText)`
	&& {
		.MuiListItemText-primary {
      color: white;
    }
    .MuiListItemText-secondary{
      color: white;
    }
	}
`;

const StyledDialogTitle = styled(DialogTitle)`
	&& {
		display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 12px;
    color: white;
	}
`;



const TrailerDialog = ({ videoTitle }) => {
	const [videos, search, isLoading] = useVideos();
	const [openModal, setOpenModal] = useState(false);
	const [videoId, setVideoId] = useState(null);

	useEffect(() => {
    if (videoTitle) {
      search(videoTitle);
      setOpenModal(true);
    }
		
    return () => {
      setOpenModal(false);
      setVideoId(null)
    }
	}, [videoTitle]);

	const handleClose = (event, reason) => {
		if (reason && reason === "backdropClick") {
			setVideoId(null);
		}

		if (reason && reason === "backdropClick" && !videoId) {
			setOpenModal(false);
		}
	};

	const onVideoClick = (value: string) => {
		setVideoId(value);
	};

	return (
		<>
			<StyledDialog open={openModal} onClose={handleClose} fullScreen={videoId}>
        {isLoading && openModal ? <ProgressSpinner /> :  
        <>
          <StyledDialogTitle>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenModal(false);
                setVideoId(null);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography>Movie / Show Trailers</Typography>
          </StyledDialogTitle>
          <StyledDialogContent>
            {videoId ? (
              <StyledYoutube
                style={{ width: "100%", height: "100%" }}
                videoId={videoId}
                opts={{ playerVars: { autoplay: 1 } }}
              />
            ) : (
              videos.map(({ title, videoId, image, description, timestamp, views, author: { name } }: never) => (
                <ListItem disableGutters key={videoId}>
                  <ListItemButton onClick={() => onVideoClick(videoId)}  >
                    <img style={{width: "200px"}} height={100} src={image} alt={description} />
                    <div style={{display: "flex", flexDirection: "column"}}>
                      <StyledListItemText
                        style={{ color: "white", marginLeft: "12px" }}
                        secondary={`Time: ${timestamp} | Views: ${views} | Author: ${name}`}
                        primary={`${title}`}
                      />
                    </div>
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </StyledDialogContent>
        </> }
			</StyledDialog>
		</>
	);
};

export { TrailerDialog };
