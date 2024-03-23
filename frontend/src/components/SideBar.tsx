import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SentIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MailComposer from "./EmailCompose";
import EmailInbox from "./EmailInbox";
import EmailsSent from "./EmailsSent";
import EmailFolders from "./EmailFolders";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { clearBasicUserInfo } from "../slices/authSlice";
import AdbIcon from "@mui/icons-material/Adb";
import Email from "./Email";

const drawerWidth = 240;

const itemsMenu: {
	id: string;
	route: string;
	name: string;
	component: JSX.Element;
}[] = [
	{
		id: "inbox",
		route: "",
		name: "Inbox",
		component: <EmailInbox />,
	},
	{
		id: "sent",
		route: "sent",
		name: "Sent",
		component: <EmailsSent />,
	},
	{
		id: "important",
		route: "important",
		name: "Important",
		component: <EmailFolders folderId={1} />,
	},
	{
		id: "social",
		route: "social",
		name: "Social",
		component: <EmailFolders folderId={2} />,
	},
	{
		id: "spam",
		route: "spam",
		name: "Spam",
		component: <EmailFolders folderId={3} />,
	},
	{
		id: "trash",
		route: "trash",
		name: "Trash",
		component: <EmailFolders folderId={4} />,
	},
	{
		id: "send-email",
		route: "send",
		name: "Send email",
		component: <MailComposer />,
	},
];

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function SideBar() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const storedValue = localStorage.getItem("FakeEmailUser");
	const parsedValue = JSON.parse(storedValue as string);
	const name = parsedValue.name;
	const location = useLocation();
	const currentRoute = location.pathname.split("/").filter(Boolean)[1] ?? "";

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	interface evtType {
		route: string;
	}

	const _clickOption = (evt: evtType) => {
		navigate(`/emails/${evt.route}`);
	};

	const handleLogout = () => {
		try {
			dispatch(clearBasicUserInfo());
			navigate("/");
			localStorage.removeItem("FakeEmailUser");
			document.cookie =
				"FakeEmailToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						id="Email"
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Email
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						id="FakeEmail"
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						FakeEmail
					</Typography>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<Typography
						id="name"
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Hi, {name}
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{itemsMenu.map((item, index) => (
						<ListItem
							onClick={() => _clickOption(item)}
							key={item.name}
							disablePadding
							sx={{
								display: "block",
								backgroundColor:
									currentRoute === item.route ? "#dbedff" : "inherit",
							}}
						>
							<ListItemButton
								title={item.name}
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{index === 0 && <InboxIcon />}
									{index === 1 && <SentIcon />}
									{index === 2 && <StarIcon />}
									{index === 3 && <ConnectWithoutContactIcon />}
									{index === 4 && <ReportProblemIcon />}
									{index === 5 && <DeleteIcon />}
									{index === 6 && <MailIcon />}
								</ListItemIcon>
								<ListItemText
									primary={item.name}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					<ListItem key="Logout" disablePadding>
						<ListItemButton onClick={handleLogout}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Routes>
					{itemsMenu.map((item) => {
						return (
							<Route
								key={item.id}
								path={`${item.route}`}
								element={item.component}
							/>
						);
					})}
					<Route path="view" element={<Email />} />
				</Routes>
			</Box>
		</Box>
	);
}
