import Section from "@/components/Section";
import { ActionTrack } from "@/components/track/ActionTrack";
import ArtistList from "@/components/track/ListArtist";
import Lyrics from "@/components/track/Lyrics";
import MusicPlayer from "@/components/track/MusicPlayer";
import PopularTrack from "@/components/track/PopularTrack";
import TrackHeader from "@/components/track/TrackHeader";

export type TrackType = {
	id_track: string;
	title: string;
	album: string;
	id_album: string;
	url_image: string;
	playcount: number;
	duration: number;
	day_release: string;
	lyrics: string;
	creatorArtist: Artist;
	featuredArtists: Artist[];
	url_mp3: string;
	popular_tracks_by_artist: TrackCardTypeList[];
	popular_albums_by_artist: AlbumCardTypeGrid[];
	type:string ;
};
export type Artist = {
	name: string;
	id_artist: string;
	url_image: string;
};
export type Release = {
	title: string;
	year: string;
	type: string;
	image: string;
};
type TrackCardTypeList = {
	track_id: string;
	name: string;
	duration: number;
	playcount: number;
	url_image: string;
};
type AlbumCardTypeGrid = {
	album_id: string;
	name: string;
	year: string;
	playcount: number;
};

const Track = () => {
	const json: TrackType = {
		id_track: "kck5bchzp6",
		title: "Đừng làm trái tim anh đau",
		id_album: "kck5bchzp6",
		url_image: "/img/img_mtp.png",
		url_mp3: "/mp3/kck5bchzp6.mp3",
		album: "m-tp M-TP",
		playcount: 1234567,
		duration: 1234567,
		day_release: "January 1, 2011",
		lyrics:
			"\nHình như trong lòng anh đã không còn hình bóng ai ngoài em đâu đâu\nHằng đêm anh nằm thao thức suy tư chẳng nhớ ai ngoài em đâu đâu\nVậy nên không cần nói nữa yêu mà đòi nói trong vài ba câu\nCứ cố quá đâm ra lại hâm uhm đau hết cả đầu\n… Đợi chờ em trước nhà từ sáng đến trưa chiều tối mắc màn đây luôn (á a a à)\nNgược nắng hay là ngược gió miễn anh thấy em tươi vui không buồn\nChỉ cần có thấy thế thôi mây xanh chan hoà\nThấy thế thôi vui hơn có quà\nVà bước kế tiếp anh lại gần hơn chút đó nha\n… Rồi ngày ấy cuối cùng đã tìm đến ta nào đâu hay hay\nAnh sẽ không để vụt mất đi cơ duyên ông trời trao tay à\nCòn đắn đo băn khoăn gì nữa tiếp cận em ngay\nCố gắng sao không để em nghi ngờ dù một giây lúc này\n… Được đứng bên em anh hạnh phúc tim loạn nhịp tung bay bay\nChắc chắn anh thề anh sẽ không bao giờ quên ngày hôm nay\nChính em chính em tương tư mình em thôi\nMãi theo sau mình em thôi\nMãi si mê mình em thôi\nMãi yêu thương mình em\n… Vậy thì anh xin chết vì người anh thương\nCó biết bao nhiêu điều còn đang vấn vương\nDành cho em dành hết ân tình anh mang một đời\nĐừng làm trái tim anh đau\n… Vậy thì anh xin chết vì người anh thương nên\nCó biết bao nhiêu điều còn đang vấn vương\nDành cho em dành hết ân tình anh mang một đời\nĐừng làm trái tim anh đau\n… Tình cờ lọt vào nụ cười ngọt ngào ngào\nAnh thề không biết đường thoát ra làm sao\nLựa một lời chào phải thật là ngầu nào nào\nNay tự dưng sao toàn mấy câu tào lao\n… Lại gần một chút cho anh ngắm nhìn người vài phút say trong cơn mơ thiên đàng\nQuên đi chuyện của nhân gian\nHoà vào trăng sao tan theo miên man\n… Nhiều lời rồi đấy nhé dài dòng rồi đấy nhé\nRồi cứ thế vòng lặp lại cứ thế\nLại bối rối không xong là đến tối nói luôn đi đời này chỉ cần mình em thôi\n… Giấu hết nhớ nhung sâu trong lời nhạc\nNối tiếp những áng thơ ngô nghê rời rạc\nViết lên chuyện đôi ta vào một ngày không xa ngày về chung một nhà\n… Rồi ngày ấy cuối cùng đã tìm đến ta nào đâu hay hay\nAnh sẽ không để vụt mất đi cơ duyên ông trời trao tay à\nCòn đắn đo băn khoăn gì nữa tiếp cận em ngay ngay\nCố gắng sao không để em nghi ngờ dù một giây lúc này\n… Được đứng bên em anh hạnh phúc tim loạn nhịp tung bay bay\nChắc chắn anh thề anh sẽ không bao giờ quên ngày hôm nay\nChính em chính em tương tư mình em thôi\nMãi theo sau mình em thôi\nMãi si mê mình em thôi\nMãi yêu thương mình em (mãi mình em)\n… Vậy thì anh xin chết vì người anh thương\nCó biết bao nhiêu điều còn đang vấn vương\nDành cho em dành hết ân tình anh mang một đời\nĐừng làm trái tim anh đau\n… Vậy thì anh xin chết vì người anh thương nên\nCó biết bao nhiêu điều còn đang vấn vương\nDành cho em dành hết ân tình anh mang một đời\nĐừng làm trái tim anh đau\n… Vậy thì anh xin chết vì người anh thương\nCó biết bao nhiêu điều còn đang vấn vương\nDành cho em dành hết ân tình anh mang một đời\nĐừng làm trái tim anh đau",
		creatorArtist: {
			name: "Sơn Tùng M-TP",
			id_artist: "artist/img_artist.png",
			url_image: "/img/img_artist.png",
		},
		featuredArtists: [
			{
				name: "Gotye",
				id_artist: "/img/img_artist.png",
				url_image: "/img/img_artist.png",
			},
			{
				name: "Kimbra",
				id_artist: "/img/img_artist.png",
				url_image: "/img/img_artist.png",
			},
		],
		popular_tracks_by_artist: [
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
		],
		popular_albums_by_artist: [
			{
				album_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Making Mirrors",
				year: "2011",
				playcount: 1234567,
			},
			{
				album_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Making Mirrors",
				year: "2011",
				playcount: 1234567,
			},
			{
				album_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Making Mirrors",
				year: "2011",
				playcount: 1234567,
			},
			{
				album_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Making Mirrors",
				year: "2011",
				playcount: 1234567,
			},
		],
		type: "song"
	};
	const json1: TrackType = {
		id_track: "noca123",
		title: "Nơi này có anh",
		id_album: "noca_album123",
		url_image: "/img/noca_track.png",
		album: "Nơi này có anh - Single",
		playcount: 987654,
		duration: 210,
		day_release: "February 14, 2017",
		lyrics:
			"Em là ai từ đâu bước đến nơi đây dịu dàng chân phương\nEm là ai tựa như ánh nắng ban mai ngọt ngào trong sương\nNgắm em thật lâu con tim anh yếu mềm\nĐắm say từ phút đó từng giây trôi yêu thêm\n…",
		creatorArtist: {
			name: "Sơn Tùng M-TP",
			id_artist: "son-tung-mtp",
			url_image: "/img/img_artist.png",
		},
		url_mp3: "/mp3/noinaycoanh.mp3",
		featuredArtists: [],
		popular_tracks_by_artist: [
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
			{
				track_id: "1cbLoF2FHZrdcAuH28eZ97",
				name: "Đừng làm trái tim anh đau",
				duration: 1234567,
				playcount: 1234567,
				url_image: "/img/img_track.png",
			},
		],
		popular_albums_by_artist: [
			{
				album_id: "noca_album123",
				name: "Nơi này có anh - Single",
				year: "2017",
				playcount: 987654,
			},
			{
				album_id: "kck5bchzp6_album",
				name: "Đừng làm trái tim anh đau - Single",
				year: "2016",
				playcount: 1234567,
			},
		],
		type: "song"
	};

	return (
		<div>
			<TrackHeader
				name={json.title}
				id_album={json.id_album}
				url_image={json.url_image}
				album={json.album}
				playcount={json.playcount}
				duration={json.duration}
				day_release={json.day_release}
				creatorArtist={json.creatorArtist}
			/>

			<div className=" mt-2 p-5 flex justify-center">
				<ActionTrack
					id_track={json.id_track}
					title={json.title}
					url_mp3={json.url_mp3}
					time_pause={0}
					artists={[]}
					inPlaylist={false}
				/>
				<ActionTrack
					id_track={json1.id_track}
					title={json1.title}
					url_mp3={json1.url_mp3}
					time_pause={0}
					artists={[]}
					inPlaylist={false}
				/>
			</div>

			<div className="p-5">
				<MusicPlayer />
			</div>

			<div className="flex px-5 flex-wrap">
				<div className="flex-[3] min-w-[500px]">
					<Lyrics lyrics={json.lyrics} />
				</div>
				<div className="flex-[2] flex-wrap">
					<ArtistList/>
				</div>
			</div>

			<div className="px-10">
				<h2 className="text-2xl font-bold">
					<span className=" text-base font-medium ">Popular Tracks by </span>
					<br />
					{json.creatorArtist.name}
				</h2>
				<PopularTrack/>
			</div>
			<div className="px-10">
				<h2 className="text-2xl font-bold">
					<span className=" text-base font-medium ">Popular Tracks by </span>
					<br />
					{json.creatorArtist.name}
				</h2>
				<Section
					musicCardProps={{
						data: {
							img: "https://i.scdn.co/image/ab67616d00001e027b3145efa3de00bc465218b4",
							title: "Đừng làm trái tim anh đau",
							artist: "Gotye",
						},
						shape: "square",
					}}
					title={""}
					url={""}
				/>
			</div>
			<div className="p-5">
				<h2 className="text-2xl font-bold">Popular Release by {json.creatorArtist.name}</h2>
				
			</div>
		</div>
	);
};

export default Track;
