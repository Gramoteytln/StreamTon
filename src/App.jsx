import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaHome,
  FaPlus,
  FaUser,
  FaHeart,
  FaGift,
  FaEnvelope,
  FaSearch,
  FaGlobe,
  FaEye,
  FaTimes,
  FaUserPlus,
  FaPaperPlane,
  FaWallet,
  FaCrown,
  FaMedal,
  FaArrowLeft,
  FaPlay,
  FaTh,
  FaCog,
  FaCircle,
  FaChevronRight,
  FaEdit,
  FaDonate,
  FaSlidersH,
  FaTrash
} from "react-icons/fa";
import { MdOutlineLiveTv } from "react-icons/md";
const bottomNavIconWrap = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};

const bottomNavUnreadBadge = {
  position: "absolute",
  top: -6,
  right: -10,
  minWidth: 16,
  height: 16,
  padding: "0 4px",
  borderRadius: 999,
  background: "#ff4d6d",
  color: "white",
  fontSize: 9,
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  border: "1px solid rgba(11,11,15,0.9)"
};
const PLATFORM_ITEMS = [
  { id: 1, type: "stream", title: "Alex вечерний эфир", author: "Alex" },
  { id: 2, type: "stream", title: "Mila live chat", author: "Mila" },
  { id: 3, type: "video", title: "Лучшие моменты стрима", author: "Dani" },
  { id: 4, type: "video", title: "Игры и реакции", author: "Roma" },
  { id: 5, type: "stream", title: "Музыка и общение", author: "Kate" }
];

const PROFILE_VIDEOS = [
  { id: 1, views: "12.4K" },
  { id: 2, views: "8.7K" },
  { id: 3, views: "15.2K" },
  { id: 4, views: "9.1K" },
  { id: 5, views: "11.3K" },
  { id: 6, views: "7.8K" }
];

const PROFILE_THUMB_GRADIENTS = [
  "linear-gradient(135deg, #5c1f74, #191128)",
  "linear-gradient(135deg, #7121a7, #21103d)",
  "linear-gradient(135deg, #41186b, #171021)",
  "linear-gradient(135deg, #6d1f8f, #141226)"
];

const quickProfileCard = {
  initials: "DS",
  name: "TOLYANYCH",
  username: "@tolyanych",
  followers: "48.2K",
  likes: "1.2M",
  views: "12.4K"
};

const streamerProfile = {
  name: "Alice Stream",
  username: "@alice.stream",
  following: "128",
  followers: "12.4K",
  likes: "245.6K",
  bio: "ЗВЕЗДНЫЙ СТРИМЕР!🔥"
};

const MESSAGE_THREADS = [
  {
    id: 1,
    name: "Alex",
    username: "@alex_live",
    avatar: "A",
    avatarBg: "linear-gradient(135deg, #6a57ff, #42cbf4)",
    preview: "Ты сегодня будешь в эфире?",
    lastMessage: "Ты сегодня будешь в эфире?",
    unread: 2,
    online: true,
    followers: "8.4K",
    likes: "112K",
    bio: "Люблю лайвы, общение и движ 💙",
    messages: [
      { id: 1, mine: false, text: "Привет!" },
      { id: 2, mine: true, text: "Привет, Alex" },
      { id: 3, mine: false, text: "Ты сегодня будешь в эфире?" }
    ]
  },
  {
    id: 2,
    name: "Mila",
    username: "@mila_vibe",
    avatar: "M",
    avatarBg: "linear-gradient(135deg, #ff6aa2, #7c5cff)",
    preview: "Спасибо за эфир 💜",
    lastMessage: "Спасибо за эфир 💜",
    unread: 0,
    online: true,
    followers: "12.1K",
    likes: "245K",
    bio: "Музыка, эмоции и vibe ✨",
    messages: [
      { id: 1, mine: false, text: "Спасибо за эфир 💜" },
      { id: 2, mine: true, text: "Пожалуйста 🌸" }
    ]
  },
  {
    id: 3,
    name: "Dani",
    username: "@dani_stream",
    avatar: "D",
    avatarBg: "linear-gradient(135deg, #00b894, #0984e3)",
    preview: "Скинь ссылку на стрим",
    lastMessage: "Скинь ссылку на стрим",
    unread: 1,
    online: false,
    followers: "6.7K",
    likes: "88K",
    bio: "Игры, реакции и вечерние стримы 🎮",
    messages: [
      { id: 1, mine: false, text: "Скинь ссылку на стрим" }
    ]
  },
  {
    id: 4,
    name: "Roma",
    username: "@roma_ton",
    avatar: "R",
    avatarBg: "linear-gradient(135deg, #f39c12, #d35400)",
    preview: "Позже напишу",
    lastMessage: "Позже напишу",
    unread: 0,
    online: false,
    followers: "4.9K",
    likes: "54K",
    bio: "TON, крипта и разговоры по делу 🚀",
    messages: [
      { id: 1, mine: true, text: "Ок, жду" },
      { id: 2, mine: false, text: "Позже напишу" }
    ]
  },
  {
    id: 5,
    name: "Kate",
    username: "@kate_room",
    avatar: "K",
    avatarBg: "linear-gradient(135deg, #8e44ad, #e84393)",
    preview: "Музыка сегодня будет?",
    lastMessage: "Музыка сегодня будет?",
    unread: 0,
    online: true,
    followers: "15.3K",
    likes: "301K",
    bio: "Комната, музыка и уютные эфиры 🎵",
    messages: [
      { id: 1, mine: false, text: "Музыка сегодня будет?" },
      { id: 2, mine: true, text: "Да, ближе к вечеру" }
    ]
  }
];

export default function App() {
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);
  const directChatEndRef = useRef(null);
  const lastTapRef = useRef(0);
  const swipeStartXRef = useRef(0);
  const swipeThreadIdRef = useRef(null);

  const [screen, setScreen] = useState("home");
  const [screenStack, setScreenStack] = useState(["home"]);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(["Alex", "стрим", "игры", "музыка"]);

  const [messagesSearchQuery, setMessagesSearchQuery] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [directMessageText, setDirectMessageText] = useState("");
  const [messageThreads, setMessageThreads] = useState(MESSAGE_THREADS);
  const [openedProfileThreadId, setOpenedProfileThreadId] = useState(null);
  const [swipedThreadId, setSwipedThreadId] = useState(null);
  const [isLive] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [streamSetupOpen, setStreamSetupOpen] = useState(false);
  const [streamName, setStreamName] = useState("");
  const [streamNickname, setStreamNickname] = useState("");
  const [streamAvatar, setStreamAvatar] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [message, setMessage] = useState("");
  const [likes, setLikes] = useState(8300);
  const [displayLikes, setDisplayLikes] = useState(8300);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [flyingLikes, setFlyingLikes] = useState([]);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState(1);
  const [giftAnimation, setGiftAnimation] = useState(null);
  const [tonBalance, setTonBalance] = useState(10);
  const [giftError, setGiftError] = useState("");
  const [giftSentCount, setGiftSentCount] = useState({});
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isDonorsOpen, setIsDonorsOpen] = useState(false);

  const [inviteUsers, setInviteUsers] = useState([
    { id: 1, name: "Alex", username: "@alex_live", status: "online", invited: false },
    { id: 2, name: "Mila", username: "@mila_vibe", status: "online", invited: false },
    { id: 3, name: "Dani", username: "@dani_stream", status: "online", invited: false },
    { id: 4, name: "Roma", username: "@roma_ton", status: "away", invited: false },
    { id: 5, name: "Kate", username: "@kate_room", status: "online", invited: false },
    { id: 6, name: "Vlad", username: "@vlad_go", status: "busy", invited: false }
  ]);

  const [donorTotals, setDonorTotals] = useState([
    { id: 1, name: "Alex", amount: 25.5, gift: "👑" },
    { id: 2, name: "Mila", amount: 14.2, gift: "🚀" },
    { id: 3, name: "Dani", amount: 8.7, gift: "💎" },
    { id: 4, name: "Roma", amount: 4.1, gift: "⭐" },
    { id: 5, name: "Kate", amount: 2.8, gift: "🔥" },
    { id: 999, name: "Ты", amount: 0, gift: "—" }
  ]);

  const fakeUsers = ["Alex", "Mila", "Dani", "Roma", "Kate", "Nika", "Oleg", "Max", "Lena", "Vlad"];
  const fakeTexts = [
    "Огонь эфир 🔥",
    "Слышно хорошо?",
    "Привет всем!",
    "Красиво получилось",
    "Топ стрим",
    "Лайкнул 👍",
    "Звук норм",
    "Очень атмосферно",
    "Подарок сейчас закину",
    "Кто ещё тут?",
    "Всё плавно работает",
    "Хорошая картинка",
    "Смотрю дальше 👀"
  ];

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Alex", text: "Огонь эфир 🔥", mine: false },
    { id: 2, user: "Mila", text: "Слышно хорошо?", mine: false },
    { id: 3, user: "Dani", text: "Привет всем!", mine: false }
  ]);

  const gifts = [
    { id: 1, emoji: "🌹", name: "Роза", price: 0.1 },
    { id: 2, emoji: "🔥", name: "Огонь", price: 0.3 },
    { id: 3, emoji: "⭐", name: "Звезда", price: 0.5 },
    { id: 4, emoji: "💜", name: "Сердце", price: 0.7 },
    { id: 5, emoji: "🛩️", name: "Самолёт", price: 1 },
    { id: 6, emoji: "🚀", name: "Ракета", price: 1.5 },
    { id: 7, emoji: "👑", name: "Корона", price: 3 },
    { id: 8, emoji: "💎", name: "Бриллиант", price: 5 }
  ];

  const selectedGift = gifts.find((gift) => gift.id === selectedGiftId) || gifts[0];
  const invitedCount = inviteUsers.filter((user) => user.invited).length;
  const canInviteMore = invitedCount < 3;
  const invitedUsers = inviteUsers.filter((user) => user.invited);

  const sortedDonors = useMemo(() => {
    const sorted = [...donorTotals].sort((a, b) => b.amount - a.amount);
    return sorted.map((donor, index) => ({
      ...donor,
      rank: index + 1,
      place: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "other"
    }));
  }, [donorTotals]);

  const topThreeDonors = sortedDonors.slice(0, 3);

  const filteredSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PLATFORM_ITEMS.filter(
      (item) => item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredMessageThreads = useMemo(() => {
    const q = messagesSearchQuery.trim().toLowerCase();
    if (!q) return messageThreads;

    return messageThreads.filter((thread) => {
      const inName = thread.name.toLowerCase().includes(q);
      const inUsername = thread.username.toLowerCase().includes(q);
      const inLastMessage = thread.lastMessage.toLowerCase().includes(q);
      const inMessages = thread.messages.some((msg) => msg.text.toLowerCase().includes(q));
      return inName || inUsername || inLastMessage || inMessages;
    });
  }, [messagesSearchQuery, messageThreads]);

  const selectedThread = useMemo(
    () => messageThreads.find((thread) => thread.id === selectedThreadId) || null,
    [messageThreads, selectedThreadId]
  );
const selectedProfileThread = useMemo(
  () => messageThreads.find((thread) => thread.id === openedProfileThreadId) || null,
  [messageThreads, openedProfileThreadId]
);

const totalUnreadCount = useMemo(
  () => messageThreads.reduce((sum, thread) => sum + thread.unread, 0),
  [messageThreads]
);
  const resetSearchState = () => {
    setSearchQuery("");
  };

  const resetMessagesState = () => {
    setMessagesSearchQuery("");
  };

  const navigateTo = (nextScreen) => {
    setScreenStack((prev) => {
      const current = prev[prev.length - 1];

      if (current === "search" && nextScreen !== "search") {
        resetSearchState();
      }

      if (current === "messages" && nextScreen !== "messages" && nextScreen !== "direct_chat") {
        resetMessagesState();
      }

      if (current === nextScreen) return prev;
      return [...prev, nextScreen];
    });
    setScreen(nextScreen);
  };

  const goBack = () => {
    setScreenStack((prev) => {
      if (prev.length <= 1) {
        if (prev[0] === "search") resetSearchState();
        if (prev[0] === "messages") resetMessagesState();
        setScreen("home");
        return ["home"];
      }

      const current = prev[prev.length - 1];
      const nextStack = prev.slice(0, -1);
      const previousScreen = nextStack[nextStack.length - 1] || "home";

      if (current === "search") {
        resetSearchState();
      }

      if (current === "messages") {
        resetMessagesState();
      }

      if (current === "direct_chat") {
        setDirectMessageText("");
      }

      setScreen(previousScreen);
      return nextStack;
    });
    setIsProfileCardOpen(false);
  };

  const handleSaveSearchQuery = (query) => {
    const clean = query.trim();
    if (!clean) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 8);
    });
  };

  const handleOpenSearch = (e) => {
    if (e) e.stopPropagation();
    setIsProfileCardOpen(false);
    navigateTo("search");
  };

  const handleOpenMessages = (e) => {
    if (e) e.stopPropagation();
    setIsProfileCardOpen(false);
    navigateTo("messages");
  };

  const handleOpenDirectChat = (threadId) => {
  setSelectedThreadId(threadId);
  handleMarkThreadRead(threadId);
  setSwipedThreadId(null);
  navigateTo("direct_chat");
};
  const renderDirectChatScreen = () => {
  if (!selectedThread) return null;

  return (
    <div style={directChatScreen} onClick={(e) => e.stopPropagation()}>
      <div style={directChatHeader}>
        <button style={backBtn} onClick={goBack}>
          <FaArrowLeft />
        </button>

        <button
          type="button"
          style={directChatProfileBtn}
          onClick={(e) => handleOpenThreadProfile(selectedThread.id, e)}
        >
          <div style={directChatHeaderCenter}>
            <div
              style={{
                ...directChatHeaderAvatar,
                background: selectedThread.avatarBg
              }}
            >
              {selectedThread.avatar}
            </div>

            <div style={directChatHeaderMeta}>
              <div style={directChatHeaderName}>{selectedThread.name}</div>
              <div style={directChatHeaderSub}>
                {selectedThread.online ? "в сети" : selectedThread.username}
              </div>
            </div>
          </div>
        </button>

        <div style={settingsHeaderSpacer} />
      </div>

      <div style={directChatMessagesArea}>
        <div style={directChatMessagesList}>
          {selectedThread.messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...directChatBubble,
                ...(msg.mine ? directChatBubbleMine : directChatBubbleOther)
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={directChatEndRef} />
        </div>
      </div>

      <div style={directChatInputBar}>
        <div style={directChatInputWrap}>
          <input
            style={directChatInput}
            type="text"
            placeholder="Написать сообщение..."
            value={directMessageText}
            onChange={(e) => setDirectMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendDirectMessage(e);
            }}
          />
        </div>

        <button style={sendBtn} onClick={handleSendDirectMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};
const handleOpenThreadProfile = (threadId, e) => {
  if (e) e.stopPropagation();
  setOpenedProfileThreadId(threadId);
  navigateTo("contact_profile");
};

const handleDeleteThread = (threadId, e) => {
  e.stopPropagation();
  setMessageThreads((prev) => prev.filter((thread) => thread.id !== threadId));
  setSwipedThreadId((prev) => (prev === threadId ? null : prev));

  if (selectedThreadId === threadId) {
    setSelectedThreadId(null);
    setDirectMessageText("");
    setScreen("messages");
    setScreenStack((prev) => prev.filter((item, index) => !(item === "direct_chat" && index === prev.length - 1)));
  }
};

const handleThreadTouchStart = (threadId, e) => {
  swipeThreadIdRef.current = threadId;
  swipeStartXRef.current = e.touches[0].clientX;
};

const handleThreadTouchEnd = (threadId, e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - swipeStartXRef.current;

  if (diff < -50) {
    setSwipedThreadId(threadId);
  } else if (diff > 35) {
    setSwipedThreadId(null);
  }

  swipeThreadIdRef.current = null;
};

const handleMarkThreadRead = (threadId) => {
  setMessageThreads((prev) =>
    prev.map((thread) =>
      thread.id === threadId ? { ...thread, unread: 0 } : thread
    )
  );
};
  const handleSendDirectMessage = (e) => {
    e.stopPropagation();
    const cleanMessage = directMessageText.trim();
    if (!cleanMessage || !selectedThread) return;

    setMessageThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== selectedThread.id) return thread;

        const nextMessages = [
          ...thread.messages,
          { id: Date.now(), mine: true, text: cleanMessage }
        ];

        return {
          ...thread,
          messages: nextMessages,
          lastMessage: cleanMessage,
          unread: 0
        };
      })
    );

    setDirectMessageText("");
  };

  const handleOpenProfileCard = (e) => {
    e.stopPropagation();
    setIsProfileCardOpen(true);
    setIsGiftOpen(false);
    setIsInviteOpen(false);
    setIsDonorsOpen(false);
  };

  const handleOpenFullProfile = (e) => {
    if (e) e.stopPropagation();
    setIsProfileCardOpen(false);
    navigateTo("profile");
  };

  const handleOpenSettings = (e) => {
    if (e) e.stopPropagation();
    navigateTo("settings");
  };

  const handleOpenWallet = () => navigateTo("wallet");
  const handleOpenEditProfile = () => navigateTo("edit_profile");
  const handleOpenDonate = () => navigateTo("donate");
  const handleOpenPreferences = () => navigateTo("preferences");

 useEffect(() => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();

    const openFull = () => {
      tg.expand();

      if (tg.requestFullscreen) {
        tg.requestFullscreen();
      }

      if (tg.disableVerticalSwipes) {
        tg.disableVerticalSwipes();
      }
    };

    openFull();
    setTimeout(openFull, 300);
    setTimeout(openFull, 1000);
  }

  let currentStream;

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      currentStream = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
      }
    })
    .catch(console.error);

  return () => {
    if (currentStream) currentStream.getTracks().forEach((t) => t.stop());
  };
}, []);

  useEffect(() => {
    if (isJoined && screen === "home") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages, isJoined, screen]);

  useEffect(() => {
    if (screen === "direct_chat") {
      directChatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [screen, selectedThread, messageThreads]);

  useEffect(() => {
    if (!isJoined || screen !== "home") return;
    const interval = setInterval(() => {
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomText = fakeTexts[Math.floor(Math.random() * fakeTexts.length)];
      setChatMessages((prev) => {
        const next = [...prev, { id: Date.now() + Math.random(), user: randomUser, text: randomText, mine: false }];
        return next.length > 40 ? next.slice(next.length - 40) : next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isJoined, screen]);

  useEffect(() => {
    if (displayLikes === likes) return;
    const diff = likes - displayLikes;
    const step = Math.abs(diff) > 20 ? Math.ceil(diff / 8) : diff > 0 ? 1 : -1;
    const timer = setTimeout(() => setDisplayLikes((p) => p + step), 35);
    return () => clearTimeout(timer);
  }, [likes, displayLikes]);

  const spawnFlyingLike = (count = 1) => {
    const colors = ["#7c5cff", "#27c1c9", "#ff7a59", "#ffd166", "#ff4fd8"];
    const created = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + Math.random() + i,
      drift: Math.floor(Math.random() * 90) - 45,
      delay: Math.random() * 0.18,
      rotate: Math.floor(Math.random() * 50) - 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.floor(Math.random() * 26),
      y: Math.floor(Math.random() * 18),
      scale: 0.85 + Math.random() * 0.4
    }));
    setFlyingLikes((p) => [...p, ...created]);
    created.forEach((item) => {
      setTimeout(() => setFlyingLikes((p) => p.filter((l) => l.id !== item.id)), 1450);
    });
  };

  const getBurstCount = () => {
    const now = Date.now();
    const diff = now - lastTapRef.current;
    lastTapRef.current = now;
    return diff < 260 ? 3 + Math.floor(Math.random() * 3) : 1;
  };

  const handleContainerClick = () => {
  if (screen !== "home") return;

  if (!isJoined && isLive) {
    setStreamSetupOpen(true);
    return;
  }

  if (isJoined && !isGiftOpen && !isInviteOpen && !isDonorsOpen && !isProfileCardOpen) {
    const burst = getBurstCount();
    setLikes((p) => p + burst);
    spawnFlyingLike(burst);
  }
};

  const handleCloseLive = (e) => {
    e.stopPropagation();
    setIsJoined(false);
    setIsGiftOpen(false);
    setIsInviteOpen(false);
    setIsDonorsOpen(false);
    setIsProfileCardOpen(false);
    setGiftAnimation(null);
    setGiftError("");
  };

  const handleSendMessage = (e) => {
    e.stopPropagation();
    const cleanMessage = message.trim();
    if (!cleanMessage) return;
    setChatMessages((p) => {
      const next = [...p, { id: Date.now(), user: "Ты", text: cleanMessage, mine: true }];
      return next.length > 40 ? next.slice(next.length - 40) : next;
    });
    setMessage("");
    inputRef.current?.focus();
  };

  const handleSubscribe = (e) => {
    e.stopPropagation();
    setIsSubscribed((p) => !p);
  };

  const handleOpenGift = (e) => {
    e.stopPropagation();
    setGiftError("");
    setIsGiftOpen(true);
    setIsInviteOpen(false);
    setIsDonorsOpen(false);
    setIsProfileCardOpen(false);
  };

  const handleCloseGift = (e) => {
    e.stopPropagation();
    setIsGiftOpen(false);
    setGiftError("");
  };

  const sendGiftInstantly = (gift, e) => {
    e.stopPropagation();
    setSelectedGiftId(gift.id);
    if (tonBalance < gift.price) return setGiftError(`Недостаточно TON. Нужно ${formatTon(gift.price)}`);

    setTonBalance((p) => Number((p - gift.price).toFixed(2)));
    setGiftError("");
    setGiftSentCount((p) => ({ ...p, [gift.id]: (p[gift.id] || 0) + 1 }));
    setGiftAnimation({
      id: Date.now(),
      emoji: gift.emoji,
      burst: Array.from({ length: 10 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        emoji: gift.emoji,
        x: Math.floor(Math.random() * 180) - 90,
        y: -(60 + Math.floor(Math.random() * 120)),
        rotate: Math.floor(Math.random() * 90) - 45,
        delay: Math.random() * 0.08,
        size: 18 + Math.floor(Math.random() * 14)
      }))
    });
    setChatMessages((p) => {
      const next = [...p, { id: Date.now(), user: "Ты", text: `отправил подарок ${gift.emoji}`, mine: true, isGiftMessage: true }];
      return next.length > 40 ? next.slice(next.length - 40) : next;
    });
    setDonorTotals((p) => {
      const exists = p.find((i) => i.name === "Ты");
      if (exists) {
        return p.map((i) =>
          i.name === "Ты" ? { ...i, amount: Number((i.amount + gift.price).toFixed(2)), gift: gift.emoji } : i
        );
      }
      return [...p, { id: Date.now(), name: "Ты", amount: gift.price, gift: gift.emoji }];
    });
    setTimeout(() => setGiftAnimation(null), 2200);
  };

  const handleOpenInvite = (e) => {
    e.stopPropagation();
    setIsInviteOpen(true);
    setIsGiftOpen(false);
    setIsDonorsOpen(false);
    setIsProfileCardOpen(false);
  };

  const handleCloseInvite = (e) => {
    e.stopPropagation();
    setIsInviteOpen(false);
  };

  const handleInviteUser = (userId, e) => {
    e.stopPropagation();
    const t = inviteUsers.find((u) => u.id === userId);
    if (!t || t.invited || !canInviteMore) return;
    setInviteUsers((p) => p.map((u) => (u.id === userId ? { ...u, invited: true } : u)));
    setChatMessages((p) => {
      const n = [...p, { id: Date.now(), user: "Система", text: `${t.name} приглашён`, mine: false, isSystemMessage: true }];
      return n.length > 40 ? n.slice(n.length - 40) : n;
    });
  };

  const handleRemoveInvite = (userId, e) => {
    e.stopPropagation();
    const t = inviteUsers.find((u) => u.id === userId);
    if (!t) return;
    setInviteUsers((p) => p.map((u) => (u.id === userId ? { ...u, invited: false } : u)));
    setChatMessages((p) => {
      const n = [...p, { id: Date.now(), user: "Система", text: `${t.name} убран`, mine: false, isSystemMessage: true }];
      return n.length > 40 ? n.slice(n.length - 40) : n;
    });
  };

  const handleOpenDonors = (e) => {
    e.stopPropagation();
    setIsDonorsOpen(true);
    setIsGiftOpen(false);
    setIsInviteOpen(false);
    setIsProfileCardOpen(false);
  };

  const formatLikes = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v));
  const formatTon = (v) =>
    Number.isInteger(v) ? `${v}` : String(Number(v).toFixed(2)).replace(/\.?0+$/, "").replace(".", ",");
  const getDonorBadgeStyle = (place) => (place === "gold" ? donorGold : place === "silver" ? donorSilver : place === "bronze" ? donorBronze : donorOther);

  const renderBottomNav = (active) => (
  <div style={sharedBottomNav} onClick={(e) => e.stopPropagation()}>
    <button style={{ ...sharedNavBtn, ...(active === "home" ? sharedNavBtnActive : {}) }} onClick={goBackToHomeRoot}>
      <FaHome />
    </button>

    <button style={{ ...sharedNavBtn, ...(active === "search" ? sharedNavBtnActive : {}) }} onClick={handleOpenSearch}>
      <FaSearch />
    </button>

    <button style={sharedPlusBtn}>
      <FaPlus />
    </button>

    <button
      style={{ ...sharedNavBtn, ...(active === "messages" ? sharedNavBtnActive : {}) }}
      onClick={handleOpenMessages}
    >
      <span style={bottomNavIconWrap}>
        <FaEnvelope />
        {totalUnreadCount > 0 ? (
          <span style={bottomNavUnreadBadge}>
            {totalUnreadCount > 9 ? "9+" : totalUnreadCount}
          </span>
        ) : null}
      </span>
    </button>

    <button style={{ ...sharedNavBtn, ...(active === "profile" ? sharedNavBtnActive : {}) }} onClick={handleOpenFullProfile}>
      <FaUser />
    </button>
  </div>
);

  const goBackToHomeRoot = () => {
  resetSearchState();
  resetMessagesState();
  setIsProfileCardOpen(false);
  setSelectedThreadId(null);
  setOpenedProfileThreadId(null);
  setDirectMessageText("");
  setSwipedThreadId(null);
  setScreen("home");
  setScreenStack(["home"]);
};

  const renderSearchScreen = () => (
    <div style={searchScreen} onClick={(e) => e.stopPropagation()}>
      <div style={searchHeader}>
        <button style={backBtn} onClick={goBack}><FaArrowLeft /></button>
        <div style={searchInputWrap}>
          <input
            style={searchInput}
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveSearchQuery(searchQuery);
            }}
            autoFocus
          />
          <FaSearch style={searchIconInline} />
        </div>
      </div>
      {!searchQuery.trim() ? (
        <div style={searchBody}>
          <div style={searchSectionTitle}>История запросов</div>
          <div style={searchHistoryList}>
            {searchHistory.map((item, index) => (
              <button key={`${item}-${index}`} style={searchHistoryItem} onClick={() => setSearchQuery(item)}>
                <span style={{ flex: 1, minWidth: 0, textAlign: "left", whiteSpace: "normal", wordBreak: "break-word" }}>{item}</span>
                <FaSearch style={{ fontSize: 12, opacity: 0.55 }} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={searchBody}>
          <div style={searchSectionRow}>
            <div style={searchSectionTitle}>Результаты</div>
            <button style={saveSearchBtn} onClick={() => handleSaveSearchQuery(searchQuery)}>Сохранить</button>
          </div>
          <div style={searchResultsList}>
            {filteredSearchResults.length > 0 ? (
              filteredSearchResults.map((item) => (
                <div key={item.id} style={searchResultCard}>
                  <div style={searchResultLeft}>
                    <div style={searchResultThumb}>{item.type === "stream" ? <MdOutlineLiveTv /> : <FaPlay />}</div>
                    <div style={searchResultMeta}>
                      <div style={searchResultTitle}>{item.title}</div>
                      <div style={searchResultSub}>{item.author} • {item.type === "stream" ? "эфир" : "ролик"}</div>
                    </div>
                  </div>
                  <button style={searchOpenBtn} onClick={goBackToHomeRoot}>Открыть</button>
                </div>
              ))
            ) : (
              <div style={searchEmptyState}>
                <div style={searchEmptyTitle}>Ничего не найдено</div>
                <div style={searchEmptyText}>Попробуй другой запрос</div>
              </div>
            )}
          </div>
        </div>
      )}
      {renderBottomNav("search")}
    </div>
  );

const renderMessagesScreen = () => (
  <div style={messagesScreen} onClick={(e) => e.stopPropagation()}>
    <div style={searchHeader}>
      <button style={backBtn} onClick={goBack}>
        <FaArrowLeft />
      </button>

      <div style={searchInputWrap}>
        <input
          style={searchInput}
          type="text"
          placeholder="Поиск в сообщениях..."
          value={messagesSearchQuery}
          onChange={(e) => setMessagesSearchQuery(e.target.value)}
          autoFocus
        />
        <FaSearch style={searchIconInline} />
      </div>
    </div>

    <div style={messagesBody}>
      {filteredMessageThreads.length > 0 ? (
        <div style={messagesList}>
          {filteredMessageThreads.map((thread) => (
            <div key={thread.id} style={messageThreadRow}>
              <div style={messageThreadDeleteArea}>
                <button
                  type="button"
                  style={messageThreadDeleteBtn}
                  onClick={(e) => handleDeleteThread(thread.id, e)}
                >
                  <FaTrash />
                </button>
              </div>

              <button
                type="button"
                style={{
                  ...messageThreadCard,
                  ...(swipedThreadId === thread.id ? messageThreadCardSwiped : {})
                }}
                onClick={() => handleOpenDirectChat(thread.id)}
                onTouchStart={(e) => handleThreadTouchStart(thread.id, e)}
                onTouchEnd={(e) => handleThreadTouchEnd(thread.id, e)}
              >
                <div style={messageThreadAvatarWrap}>
                  <div style={{ ...messageThreadAvatar, background: thread.avatarBg }}>
                    {thread.avatar}
                  </div>

                  {thread.online && <span style={messageThreadOnlineDot} />}

                  {thread.unread > 0 ? (
                    <span style={messageThreadAvatarUnread}>
                      {thread.unread > 9 ? "9+" : thread.unread}
                    </span>
                  ) : null}
                </div>

                <div style={messageThreadMain}>
                  <div style={messageThreadTopRow}>
                    <div style={messageThreadName}>{thread.name}</div>
                    <div style={messageThreadTime}>{thread.time}</div>
                  </div>

                  <div style={messageThreadPreviewRow}>
                    <div style={messageThreadUsername}>{thread.username}</div>
                  </div>

                  <div style={messageThreadBottomRow}>
                    <div style={messageThreadText}>{thread.preview || thread.lastMessage}</div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={messagesEmptyState}>
          <div style={searchEmptyTitle}>Ничего не найдено</div>
          <div style={searchEmptyText}>Попробуй другой текст</div>
        </div>
      )}
    </div>

    {renderBottomNav("messages")}
  </div>
);

  const renderContactProfileScreen = () => {
  if (!selectedProfileThread) return null;

  return (
    <div style={profileScreen} onClick={(e) => e.stopPropagation()}>
      <div style={profileHeader}>
        <button style={backBtn} onClick={goBack}><FaArrowLeft /></button>
        <div style={profileHeaderTitle}>Профиль</div>
        <div style={settingsHeaderSpacer} />
      </div>

      <div style={profileBody}>
        <div style={profileAvatarLargeWrap}>
          <div
            style={{
              ...profileContactAvatarLarge,
              background: selectedProfileThread.avatarBg
            }}
          >
            {selectedProfileThread.avatar}
          </div>
          {selectedProfileThread.online ? <div style={profileContactOnlineBadge} /> : null}
        </div>

        <div style={profileName}>{selectedProfileThread.name}</div>
        <div style={profileUsername}>{selectedProfileThread.username}</div>

        <div style={profileStatsRow}>
          <div style={profileStatBlock}>
            <div style={profileStatValue}>{selectedProfileThread.followers}</div>
            <div style={profileStatLabel}>Подписчики</div>
          </div>
          <div style={profileStatBlock}>
            <div style={profileStatValue}>{selectedProfileThread.likes}</div>
            <div style={profileStatLabel}>Лайки</div>
          </div>
          <div style={profileStatBlock}>
            <div style={profileStatValue}>{selectedProfileThread.online ? "Online" : "Offline"}</div>
            <div style={profileStatLabel}>Статус</div>
          </div>
        </div>

        <div style={profileBio}>{selectedProfileThread.bio}</div>

        <button
          style={profileMainBtn}
          onClick={() => {
            setSelectedThreadId(selectedProfileThread.id);
            navigateTo("direct_chat");
          }}
        >
          Написать сообщение
        </button>
      </div>
    </div>
  );
};

  const renderProfileScreen = () => (
    <div style={profileScreen} onClick={(e) => e.stopPropagation()}>
      <div style={profileHeader}>
        <button style={backBtn} onClick={goBack}><FaArrowLeft /></button>
        <div style={profileHeaderTitle}>Профиль</div>
        <button style={profileHeaderBtn} onClick={handleOpenSettings}><FaCog /></button>
      </div>
      <div style={profileBody}>
       <div style={profileAvatarLargeWrap}>
  <div
    style={{
      ...profileAvatarLarge,
      backgroundImage: streamAvatar ? `url(${streamAvatar})` : profileAvatarLarge.backgroundImage
    }}
  />
</div>
<div style={profileName}>{streamName || streamerProfile.name}</div>
<div style={profileUsername}>{streamNickname || streamerProfile.username}</div>
        <div style={profileStatsRow}>
          <div style={profileStatBlock}><div style={profileStatValue}>{streamerProfile.following}</div><div style={profileStatLabel}>Подписки</div></div>
          <div style={profileStatBlock}><div style={profileStatValue}>{streamerProfile.followers}</div><div style={profileStatLabel}>Подписчики</div></div>
          <div style={profileStatBlock}><div style={profileStatValue}>{streamerProfile.likes}</div><div style={profileStatLabel}>Лайки</div></div>
        </div>
        <div style={profileBio}>{streamerProfile.bio.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}</div>
        <button style={profileMainBtn}>Редактировать профиль</button>
        <div style={profileTabs}>
          <button style={{ ...profileTabBtn, color: "white", borderBottom: "2px solid #7c5cff" }}><FaTh /></button>
          <button style={profileTabBtn}><FaPlay /></button>
          <button style={profileTabBtn}><MdOutlineLiveTv /></button>
        </div>
        <div style={profileGrid}>
          {PROFILE_VIDEOS.map((item, index) => (
            <div key={item.id} style={profileGridItem}>
              <div style={{ ...profileGridThumb, background: PROFILE_THUMB_GRADIENTS[index % PROFILE_THUMB_GRADIENTS.length] }}>
                <div style={profileGridOverlay} />
                <div style={profileGridBottom}><FaPlay style={{ fontSize: 10 }} /><span style={profileGridViews}>{item.views}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {renderBottomNav("profile")}
    </div>
  );

  const renderSettingsScreen = () => (
    <div style={profileScreen} onClick={(e) => e.stopPropagation()}>
      <div style={profileHeader}>
        <button style={backBtn} onClick={goBack}><FaArrowLeft /></button>
        <div style={profileHeaderTitle}>Настройки</div>
        <div style={settingsHeaderSpacer} />
      </div>
      <div style={settingsBody}>
        <button style={settingsItem} onClick={handleOpenWallet}>
          <div style={settingsItemLeft}><FaWallet style={settingsItemIcon} /><span>Кошелек TON</span></div>
          <FaChevronRight style={settingsArrow} />
        </button>
        <button style={settingsItem} onClick={handleOpenEditProfile}>
          <div style={settingsItemLeft}><FaEdit style={settingsItemIcon} /><span>Редактировать профиль</span></div>
          <FaChevronRight style={settingsArrow} />
        </button>
        <button style={settingsItem} onClick={handleOpenDonate}>
          <div style={settingsItemLeft}><FaDonate style={settingsItemIcon} /><span>Donate</span></div>
          <FaChevronRight style={settingsArrow} />
        </button>
        <button style={settingsItem} onClick={handleOpenPreferences}>
          <div style={settingsItemLeft}><FaSlidersH style={settingsItemIcon} /><span>Настройки</span></div>
          <FaChevronRight style={settingsArrow} />
        </button>
      </div>
    </div>
  );

  const renderSubpage = (title, subtitle, content) => (
    <div style={profileScreen} onClick={(e) => e.stopPropagation()}>
      <div style={profileHeader}>
        <button style={backBtn} onClick={goBack}><FaArrowLeft /></button>
        <div style={profileHeaderTitle}>{title}</div>
        <div style={settingsHeaderSpacer} />
      </div>
      <div style={subpageWrap}>
        <div style={subpageCard}>
          <div style={subpageTitle}>{title}</div>
          <div style={subpageSubtitle}>{subtitle}</div>
          <div style={subpageContent}>{content}</div>
        </div>
      </div>
    </div>
  );
const handleAvatarUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setStreamAvatar(reader.result);
  };
  reader.readAsDataURL(file);
};

const handleStartStream = (e) => {
  e.stopPropagation();

  if (!streamName.trim() || !streamNickname.trim()) {
    alert("Заполни имя и никнейм");
    return;
  }

  setStreamSetupOpen(false);
  setCountdown(3);

  setTimeout(() => setCountdown(2), 1000);
  setTimeout(() => setCountdown(1), 2000);
  setTimeout(() => {
    setCountdown(null);
    setIsJoined(true);
  }, 3000);
};
  return (
    <div style={container} onClick={handleContainerClick}>
      <style>{globalStyles}</style>

      <video ref={videoRef} autoPlay playsInline muted style={{ ...video, opacity: screen === "home" ? 1 : 0 }} />
{streamSetupOpen && (
  <>
    <div style={streamSetupOverlay} onClick={(e) => e.stopPropagation()} />
    <div style={streamSetupModal} onClick={(e) => e.stopPropagation()}>
      <div style={streamSetupTitle}>Запуск эфира</div>
      <div style={streamSetupSubtitle}>Заполни данные стримера</div>

      <label style={streamAvatarUpload}>
        <div
  style={{
    ...streamAvatarPreview,
    backgroundImage: streamAvatar ? `url(${streamAvatar})` : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    color: "white",
    backgroundColor: streamAvatar ? "transparent" : "rgba(255,255,255,0.08)"
  }}
>
  {!streamAvatar && "+"}
</div>
        <span>Загрузить фото</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          style={{ display: "none" }}
        />
      </label>

      <input
        style={streamSetupInput}
        value={streamName}
        onChange={(e) => setStreamName(e.target.value)}
        placeholder="Имя"
      />

      <input
        style={streamSetupInput}
        value={streamNickname}
        onChange={(e) => setStreamNickname(e.target.value)}
        placeholder="Никнейм"
      />

      <button style={streamStartBtn} onClick={handleStartStream}>
        Запустить эфир
      </button>
    </div>
  </>
)}

{countdown !== null && (
  <div style={countdownOverlay} onClick={(e) => e.stopPropagation()}>
    {countdown}
  </div>
)}
      {screen === "home" && (
        <>
          {!isJoined ? (
            <>
              <div style={topBar}>
                <div style={topLeftGroup}>
                  {isLive && <button style={topLiveBtn} onClick={(e) => { e.stopPropagation(); alert("Список друзей"); }}><MdOutlineLiveTv /></button>}
                </div>
                <button style={topSearchBtn} onClick={handleOpenSearch}><FaSearch /></button>
              </div>
              {isLive && <div style={liveBadge}>LIVE</div>}
              {renderBottomNav("home")}
            </>
          ) : (
            <>
              <div style={liveHeader}>
                <div style={authorBar} onClick={(e) => e.stopPropagation()}>
                  <div style={authorLeft}>
  <button style={clearIconBtn} onClick={handleOpenProfileCard}>
    {streamAvatar ? (
  <img
    src={streamAvatar}
    alt="avatar"
    style={authorAvatar}
  />
) : (
  <div style={{ ...authorAvatar, background: ACCENT }} />
)}
  </button>

  <button style={clearMetaBtn} onClick={handleOpenProfileCard}>
    <div style={authorMeta}>
      <div style={authorName}>{streamName}</div>
      <div style={authorStats}>
        <FaHeart style={{ fontSize: 9 }} />
        <span>{formatLikes(displayLikes)}</span>
      </div>
    </div>
  </button>

  <button style={subscribeBtn} onClick={handleSubscribe}>
    {isSubscribed ? "Подписан" : "Подписаться"}
  </button>

  {invitedUsers.length > 0 && (
    <div style={invitedAvatarsRow}>
      {invitedUsers.slice(0, 3).map((u) => (
        <div key={u.id} style={miniInvitedAvatar}>{u.name.slice(0, 1)}</div>
      ))}
    </div>
  )}
</div>
                  <div style={authorRight}>
                    <div style={liveInfoPill}><span style={liveText}>LIVE</span><span style={viewerCount}><FaEye style={{ marginRight: 4 }} /> 12.4K</span></div>
                    <div style={rightToolsColumn}>
                      <button style={closeBtn} onClick={handleCloseLive}><FaTimes /></button>
                      <button style={donorsStackBtn} onClick={handleOpenDonors}>
                        {topThreeDonors.map((d) => <span key={d.id} style={{ ...donorCircle, ...getDonorBadgeStyle(d.place) }}>{d.place === "gold" ? <FaCrown /> : <FaMedal />}</span>)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={chatScrollArea}>
                <div style={chatList}>
                  {chatMessages.map((msg) => (
                    <div key={msg.id} style={{ ...chatMessage, ...(msg.mine ? myChatMessage : {}), ...(msg.isGiftMessage ? giftChatMessage : {}), ...(msg.isSystemMessage ? systemChatMessage : {}) }}>
                      <span style={chatUser}>{msg.user}:</span> {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div style={rightPanelLive} onClick={(e) => e.stopPropagation()}>
                <button style={sideBtn} onClick={() => {
                  const burst = getBurstCount();
                  setLikes((p) => p + burst);
                  spawnFlyingLike(burst);
                }}><FaHeart /></button>
                <button style={sideBtn} onClick={handleOpenGift}><FaGift /></button>
                <button style={sideBtn} onClick={handleOpenInvite}><FaUserPlus /></button>
              </div>

              <div style={floatingLikesLayer}>
                {flyingLikes.map((item) => (
                  <div key={item.id} style={{ ...flyingLike, color: item.color, "--drift": `${item.drift}px`, "--rot": `${item.rotate}deg`, "--scale": item.scale, right: `${item.x}px`, bottom: `${item.y}px`, animationDelay: `${item.delay}s` }}>
                    <FaPaperPlane />
                  </div>
                ))}
              </div>

              {giftAnimation && (
                <>
                  <div style={giftEffectGlow} />
                  <div style={giftEffectEmojiOnly}>{giftAnimation.emoji}</div>
                  <div style={giftBurstLayer}>
                    {giftAnimation.burst.map((item) => (
                      <div key={item.id} style={{ ...giftBurstItem, "--x": `${item.x}px`, "--y": `${item.y}px`, "--r": `${item.rotate}deg`, animationDelay: `${item.delay}s`, fontSize: `${item.size}px` }}>{item.emoji}</div>
                    ))}
                  </div>
                </>
              )}

              <div style={messageBar} onClick={(e) => e.stopPropagation()}>
                <div style={messageInputWrap}>
                  <input ref={inputRef} style={messageInput} type="text" placeholder="Написать сообщение..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(e); }} />
                </div>
                <button style={sendBtn} onClick={handleSendMessage}><FaPaperPlane /></button>
              </div>

              {isProfileCardOpen && (
                <>
                  <div style={centerOverlay} onClick={() => setIsProfileCardOpen(false)} />
                  <div style={profileCardCentered} onClick={(e) => e.stopPropagation()}>
                    <button style={profileCardCloseCentered} onClick={() => setIsProfileCardOpen(false)}><FaTimes /></button>
                   <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                  <div
    style={{
      ...profileCardAvatarBig,
      backgroundImage: streamAvatar ? `url(${streamAvatar})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
    {!streamAvatar && "DS"}
                              </div>
                        </div>
                    <div style={profileCardNameBig}>{streamName}</div>
                    <div style={profileCardUsernameBig}>{streamNickname}</div>
                    <div style={profileCardLivePill}><FaCircle style={{ fontSize: 6, color: "#ff4d6d" }} /> Сейчас в эфире</div>
                    <div style={profileCardStatsCompact}>
                      <div style={profileCardCompactItem}><FaUser style={profileCardCompactIcon} /><div style={profileCardCompactValue}>{quickProfileCard.followers}</div><div style={profileCardCompactLabel}>Подписчики</div></div>
                      <div style={profileCardCompactItem}><FaHeart style={profileCardCompactIcon} /><div style={profileCardCompactValue}>{quickProfileCard.likes}</div><div style={profileCardCompactLabel}>Лайки</div></div>
                      <div style={profileCardCompactItem}><FaEye style={profileCardCompactIcon} /><div style={profileCardCompactValue}>{quickProfileCard.views}</div><div style={profileCardCompactLabel}>Просмотры</div></div>
                    </div>
                    <button style={profileCardBtn} onClick={handleOpenFullProfile}>Посмотреть профиль</button>
                  </div>
                </>
              )}

              {isGiftOpen && (
                <>
                  <div style={giftOverlay} onClick={handleCloseGift} />
                  <div style={giftModal} onClick={(e) => e.stopPropagation()}>
                    <div style={giftModalHeader}><div style={giftModalTitle}>Подарки</div><button style={giftCloseBtn} onClick={handleCloseGift}><FaTimes /></button></div>
                    <div style={giftBalanceRow}>
                      <div style={giftBalancePill}><FaWallet style={{ fontSize: 11 }} /><span>Баланс: {formatTon(tonBalance)} TON</span></div>
                      {giftSentCount[selectedGift.id] && <div style={giftCounterPill}>{selectedGift.emoji} x{giftSentCount[selectedGift.id]}</div>}
                    </div>
                    <div style={giftGrid}>
                      {gifts.map((g) => {
                        const isSel = g.id === selectedGiftId;
                        const isLock = tonBalance < g.price;
                        return (
                          <button key={g.id} style={{ ...giftCard, ...(isSel ? giftCardActive : {}), ...(isLock ? giftCardLocked : {}) }} onClick={(e) => sendGiftInstantly(g, e)}>
                            <div style={giftEmoji}>{g.emoji}</div><div style={giftName}>{g.name}</div><div style={giftPrice}>{formatTon(g.price)} TON</div>
                          </button>
                        );
                      })}
                    </div>
                    {giftError ? <div style={giftErrorText}>{giftError}</div> : <div style={giftHintText}>Нажимай по подарку сразу. Баланс списывается мгновенно.</div>}
                  </div>
                </>
              )}

              {isInviteOpen && (
                <>
                  <div style={inviteOverlay} onClick={handleCloseInvite} />
                  <div style={inviteModalWrap}>
                    <div style={inviteModal} onClick={(e) => e.stopPropagation()}>
                      <div style={inviteHeader}><div style={inviteTitle}>Пригласить в эфир</div><button style={inviteCloseBtn} onClick={handleCloseInvite}><FaTimes /></button></div>
                      <div style={inviteInfoRow}><div style={inviteInfoPill}>Эфир: <strong>{invitedCount + 1}/4</strong></div><div style={inviteInfoSubtle}>Ещё: <strong>{Math.max(0, 3 - invitedCount)}</strong></div></div>
                      <div style={inviteList}>
                        {inviteUsers.map((u) => {
                          const isDis = !u.invited && !canInviteMore;
                          const col = u.status === "online" ? "#5df2a8" : u.status === "away" ? "#ffd166" : "#ff8c8c";
                          return (
                            <div key={u.id} style={inviteUserRow}>
                              <div style={inviteUserLeft}>
                                <div style={inviteAvatar}>{u.name.slice(0, 1)}</div>
                                <div style={inviteUserMeta}><div style={inviteUserName}>{u.name}</div><div style={inviteUserSub}><span>{u.username}</span><span style={{ ...inviteStatusDot, background: col }} /><span>{u.status === "online" ? "в сети" : u.status === "away" ? "нет на месте" : "занят"}</span></div></div>
                              </div>
                              {u.invited ? <button style={inviteRemoveBtn} onClick={(e) => handleRemoveInvite(u.id, e)}>Убрать</button> : <button style={{ ...inviteActionBtn, ...(isDis ? inviteActionBtnDisabled : {}) }} onClick={(e) => handleInviteUser(u.id, e)} disabled={isDis}>Пригласить</button>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isDonorsOpen && (
                <>
                  <div style={inviteOverlay} onClick={(e) => { e.stopPropagation(); setIsDonorsOpen(false); }} />
                  <div style={donorsModalWrap}>
                    <div style={donorsModal} onClick={(e) => e.stopPropagation()}>
                      <div style={donorsHeader}><div style={inviteTitle}>Рейтинг</div><button style={donorsCloseBtn} onClick={() => setIsDonorsOpen(false)}><FaTimes /></button></div>
                      <div style={donorsList}>
                        {sortedDonors.map((d) => (
                          <div key={d.id} style={donorRow}>
                            <div style={{ ...donorPlaceIcon, ...getDonorBadgeStyle(d.place) }}>{d.place === "gold" ? <FaCrown /> : <FaMedal />}</div>
                            <div style={donorName}>{d.name}</div><div style={donorAmount}>#{d.rank}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

      {screen === "search" && renderSearchScreen()}
      {screen === "messages" && renderMessagesScreen()}
      {screen === "direct_chat" && renderDirectChatScreen()}
      {screen === "contact_profile" && renderContactProfileScreen()}
      {screen === "profile" && renderProfileScreen()}
      {screen === "settings" && renderSettingsScreen()}
      {screen === "wallet" && renderSubpage("Кошелек TON", "Управление балансом и адресом", "Баланс: 10 TON\nАдрес: UQ...DEMO...WALLET")}
      {screen === "edit_profile" && renderSubpage("Редактировать профиль", "Изменение имени, био и аватара", "Тут позже подключим реальные поля редактирования профиля.")}
      {screen === "donate" && renderSubpage("Donate", "Настройка донатов и реквизитов", "Тут будет управление донатами, ссылками и уведомлениями.")}
      {screen === "preferences" && renderSubpage("Настройки", "Основные параметры приложения", "Здесь будут уведомления, приватность, тема и безопасность.")}
    </div>
  );
}

const globalStyles = `
  @keyframes flyLike { 0% { transform: translateY(0) translateX(0) scale(var(--scale)) rotate(var(--rot)); opacity: 0; } 12% { opacity: 1; } 100% { transform: translateY(-150px) translateX(var(--drift)) scale(calc(var(--scale) + 0.22)) rotate(calc(var(--rot) + 16deg)); opacity: 0; } }
  @keyframes giftModalUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes giftMainPop { 0% { transform: translate(-50%, -50%) scale(0.45); opacity: 0; } 15% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; } 60% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 80% { transform: translate(-50%, -52%) scale(0.98); opacity: 1; } 100% { transform: translate(-50%, -58%) scale(0.82); opacity: 0; } }
  @keyframes giftSoftGlow { 0% { transform: translate(-50%, -50%) scale(0.4); opacity: 0; } 20% { opacity: 0.9; } 100% { transform: translate(-50%, -50%) scale(1.45); opacity: 0; } }
  @keyframes giftBurst { 0% { transform: translate(0, 0) scale(0.6) rotate(0deg); opacity: 0; } 35% { opacity: 1; } 100% { transform: translate(var(--x), var(--y)) scale(1.05) rotate(var(--r)); opacity: 0; } }
  @keyframes inviteModalUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes modalInCenter { from { transform: translate(-50%, -45%); opacity: 0; } to { transform: translate(-50%, -50%); opacity: 1; } }
  input::placeholder { color: rgba(255,255,255,0.52); }
  ::-webkit-scrollbar { width: 0; height: 0; }
`;

const APP_BG = "linear-gradient(180deg, #0a0816 0%, #110b1c 55%, #050816 100%)";
const ACCENT = "linear-gradient(135deg, #7c5cff, #3cc7d8)";
const ACCENT_SOFT = "rgba(124,92,255,0.16)";

const container = { background: "#0b0b0f", height: "100vh", maxWidth: "420px", margin: "0 auto", position: "relative", overflow: "hidden", cursor: "pointer", userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none" };
const video = { width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", transition: "opacity 0.2s" };
const topBar = { position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 14px 10px", zIndex: 5 };
const topLeftGroup = { display: "flex", alignItems: "center", gap: 8 };
const topSearchBtn = { width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.12)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, backdropFilter: "blur(8px)", cursor: "pointer" };
const topLiveBtn = { width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.12)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, backdropFilter: "blur(8px)", cursor: "pointer" };
const liveBadge = { position: "absolute", right: 10, bottom: 60, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, backdropFilter: "blur(8px)", zIndex: 4 };

const sharedBottomNav = { position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 44, display: "flex", justifyContent: "space-around", alignItems: "center", background: "rgba(12, 10, 24, 0.92)", borderTop: "1px solid rgba(124,92,255,0.16)", backdropFilter: "blur(14px)", zIndex: 80, cursor: "default" };
const sharedNavBtn = { background: "transparent", border: "none", color: "rgba(255,255,255,0.88)", fontSize: 16, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const sharedNavBtnActive = { color: "#ffffff" };
const sharedPlusBtn = { width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: ACCENT, border: "none", borderRadius: 9, color: "white", fontSize: 15, boxShadow: "0 4px 14px rgba(124, 92, 255, 0.28)", cursor: "pointer" };

const liveHeader = { position: "absolute", top: 90, left: 12, right: 2, zIndex: 6 };const authorBar = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", minHeight: 42, padding: "4px 6px", boxSizing: "border-box", background: "transparent" };
const authorLeft = { display: "flex", alignItems: "center", gap: 6, minWidth: 0 };
const authorRight = { display: "flex", alignItems: "flex-start", gap: 8, flexShrink: 0 };
const rightToolsColumn = { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 };
const clearIconBtn = { background: "none", border: "none", padding: 0, cursor: "pointer" };
const clearMetaBtn = { background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" };
const authorAvatar = { width: 28, height: 28, borderRadius: "50%", objectFit: "cover", display: "block" };
const authorMeta = { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", minWidth: 0, marginLeft: 0 };
const authorName = { color: "white", fontSize: 11, fontWeight: 700, lineHeight: 1, whiteSpace: "nowrap", margin: 0, padding: 0 };
const authorStats = { marginTop: 2, display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.9)", fontSize: 9, fontWeight: 600, lineHeight: 1 };
const subscribeBtn = { height: 26, border: "none", borderRadius: 12, padding: "0 10px", background: ACCENT, color: "white", fontSize: 10, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(39, 193, 201, 0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 2 };
const invitedAvatarsRow = { display: "flex", alignItems: "center", marginLeft: 4 };
const miniInvitedAvatar = { width: 18, height: 18, borderRadius: "50%", background: ACCENT, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, border: "1px solid rgba(255,255,255,0.35)", marginLeft: -4 };
const liveInfoPill = { height: 26, display: "flex", alignItems: "center", gap: 5, padding: "0 8px", borderRadius: 12, background: "rgba(255,255,255,0.10)", color: "white", whiteSpace: "nowrap", justifyContent: "center" };
const liveText = { fontSize: 9, fontWeight: 700, letterSpacing: 0.3, lineHeight: 1 };
const viewerCount = { display: "flex", alignItems: "center", fontSize: 9, color: "rgba(255,255,255,0.92)", lineHeight: 1 };
const donorsStackBtn = { display: "flex", flexDirection: "column", gap: 6, padding: 0, border: "none", background: "transparent", cursor: "pointer", alignItems: "center", justifyContent: "center" };
const donorCircle = { width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.18)" };
const donorGold = { background: "linear-gradient(135deg, #f7d774, #c99a17)" };
const donorSilver = { background: "linear-gradient(135deg, #d9dde8, #8f98ac)" };
const donorBronze = { background: "linear-gradient(135deg, #d89b64, #9d5b2c)" };
const donorOther = { background: "linear-gradient(135deg, #7e8aa3, #4f5a70)" };
const closeBtn = { width: 26, height: 26, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.12)", color: "white", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", cursor: "pointer", marginTop: 0 };
const chatScrollArea = { position: "absolute", left: 8, width: "150px", height: "210px", bottom: 40, overflowY: "auto", zIndex: 5, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingRight: 2, WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 78%, rgba(0,0,0,0.25) 92%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(to top, rgba(0,0,0,1) 78%, rgba(0,0,0,0.25) 92%, rgba(0,0,0,0) 100%)", scrollbarWidth: "none" };
const chatList = { display: "flex", flexDirection: "column", gap: 6, paddingBottom: 4 };
const chatMessage = { color: "white", fontSize: 11, lineHeight: 1.25, padding: "0", margin: "0", textShadow: "0 2px 8px rgba(0,0,0,0.75)", maxWidth: "100%", textAlign: "left", pointerEvents: "none", wordBreak: "break-word" };
const myChatMessage = { color: "#dff7ff" };
const giftChatMessage = { color: "#ffd166" };
const systemChatMessage = { color: "#9fe8ff" };
const chatUser = { fontWeight: 700 };
const rightPanelLive = { position: "absolute", right: 10, bottom: 10, display: "flex", flexDirection: "column", gap: 8, zIndex: 6 };
const sideBtn = { width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.14)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, backdropFilter: "blur(10px)", cursor: "pointer", flexShrink: 0 };
const floatingLikesLayer = { position: "absolute", right: 8, bottom: 90, width: 86, height: 190, pointerEvents: "none", zIndex: 7 };
const flyingLike = { position: "absolute", fontSize: 15, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))", animation: "flyLike 1.35s ease-out forwards" };
const giftEffectGlow = { position: "absolute", left: "50%", top: "45%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,255,0.22) 0%, rgba(39,193,201,0.14) 35%, rgba(0,0,0,0) 70%)", transform: "translate(-50%, -50%)", animation: "giftSoftGlow 1.8s ease-out forwards", pointerEvents: "none", zIndex: 24 };
const giftEffectEmojiOnly = { position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)", fontSize: 82, lineHeight: 1, animation: "giftMainPop 1.9s ease-out forwards", pointerEvents: "none", zIndex: 25, filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.28))" };
const giftBurstLayer = { position: "absolute", left: "50%", top: "45%", width: 0, height: 0, pointerEvents: "none", zIndex: 26 };
const giftBurstItem = { position: "absolute", left: 0, top: 0, transform: "translate(0, 0)", animation: "giftBurst 0.95s ease-out forwards", animationDelay: "1.05s", opacity: 0, filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.22))" };
const messageBar = { position: "absolute", left: 8, right: 8, bottom: 10, display: "flex", alignItems: "center", gap: 3, zIndex: 6 };
const messageInputWrap = { width: "52%", minWidth: 0, flexShrink: 0 };
const messageInput = { width: "100%", height: 32, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.14)", color: "white", padding: "0 12px", outline: "none", backdropFilter: "blur(10px)", fontSize: 13, boxSizing: "border-box" };
const sendBtn = { width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.14)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)", fontSize: 13, flexShrink: 0 };
const centerOverlay = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 };
const giftOverlay = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)", zIndex: 20 };
const giftModal = { position: "absolute", left: 0, right: 0, bottom: 0, background: "rgba(18, 20, 28, 0.96)", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: "8px 8px 8px", zIndex: 21, backdropFilter: "blur(14px)", animation: "giftModalUp 0.22s ease-out forwards", boxShadow: "0 -6px 18px rgba(0,0,0,0.28)" };
const giftModalHeader = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 };
const giftModalTitle = { color: "white", fontSize: 13, fontWeight: 700 };
const giftCloseBtn = { width: 26, height: 26, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.10)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const giftBalanceRow = { display: "flex", justifyContent: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" };
const giftBalancePill = { display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: "white", fontSize: 11, fontWeight: 600 };
const giftCounterPill = { display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 12, background: "rgba(39,193,201,0.12)", color: "white", fontSize: 11, fontWeight: 700, border: "1px solid rgba(39,193,201,0.35)" };
const giftGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 6 };
const giftCard = { border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: "6px 4px", background: "rgba(255,255,255,0.04)", color: "white", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", minHeight: 62 };
const giftCardActive = { border: "1px solid rgba(39,193,201,0.75)", background: "rgba(39,193,201,0.10)", boxShadow: "0 0 0 1px rgba(124,92,255,0.35) inset" };
const giftCardLocked = { opacity: 0.45 };
const giftEmoji = { fontSize: 18, lineHeight: 1 };
const giftName = { fontSize: 9, fontWeight: 600, textAlign: "center" };
const giftPrice = { fontSize: 8, color: "rgba(255,255,255,0.8)" };
const giftHintText = { color: "rgba(255,255,255,0.72)", fontSize: 10, textAlign: "center", paddingBottom: 2 };
const giftErrorText = { color: "#ff8c8c", fontSize: 10, textAlign: "center", fontWeight: 600, paddingBottom: 2 };
const inviteOverlay = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 30 };
const inviteModalWrap = { position: "absolute", right: 8, bottom: 50, zIndex: 31, display: "flex", justifyContent: "flex-end", pointerEvents: "none" };
const inviteModal = { width: 260, height: 350, background: "rgba(18, 20, 28, 0.97)", borderRadius: 18, padding: "10px", backdropFilter: "blur(14px)", animation: "inviteModalUp 0.22s ease-out forwards", boxShadow: "0 10px 28px rgba(0,0,0,0.32)", pointerEvents: "auto", display: "flex", flexDirection: "column", boxSizing: "border-box" };
const inviteHeader = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 };
const inviteTitle = { color: "white", fontSize: 14, fontWeight: 700 };
const inviteCloseBtn = { width: 24, height: 24, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.10)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };
const inviteInfoRow = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 8 };
const inviteInfoPill = { padding: "6px 10px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: "white", fontSize: 11, fontWeight: 600 };
const inviteInfoSubtle = { color: "rgba(255,255,255,0.72)", fontSize: 11, whiteSpace: "nowrap" };
const inviteList = { display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", paddingRight: 2, flex: 1 };
const inviteUserRow = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "8px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" };
const inviteUserLeft = { display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 };
const inviteAvatar = { width: 32, height: 32, borderRadius: "50%", background: ACCENT, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 };
const inviteUserMeta = { display: "flex", flexDirection: "column", minWidth: 0, flex: 1 };
const inviteUserName = { color: "white", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const inviteUserSub = { display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.68)", fontSize: 10, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const inviteStatusDot = { width: 6, height: 6, borderRadius: "50%", display: "inline-block", flexShrink: 0 };
const inviteActionBtn = { height: 30, minWidth: 88, border: "none", borderRadius: 10, padding: "0 12px", background: ACCENT, color: "white", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 };
const inviteActionBtnDisabled = { background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)", cursor: "not-allowed" };
const inviteRemoveBtn = { height: 30, minWidth: 88, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "0 12px", background: "rgba(255,255,255,0.08)", color: "white", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 };

const donorsModalWrap = { position: "absolute", right: 8, top: 140, zIndex: 31, display: "flex", justifyContent: "flex-end", pointerEvents: "none" };
const donorsModal = { width: 140, height: 300, background: "rgba(18, 20, 28, 0.97)", borderRadius: 16, padding: "8px", backdropFilter: "blur(14px)", animation: "inviteModalUp 0.22s ease-out forwards", boxShadow: "0 10px 28px rgba(0,0,0,0.32)", pointerEvents: "auto", display: "flex", flexDirection: "column", boxSizing: "border-box" };
const donorsHeader = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, paddingLeft: 2, paddingRight: 0 };
const donorsCloseBtn = { width: 22, height: 22, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.10)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginRight: -1 };
const donorsList = { display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1, paddingRight: 1 };
const donorRow = { display: "grid", gridTemplateColumns: "24px 1fr auto", alignItems: "center", gap: 8, padding: "8px 8px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" };
const donorPlaceIcon = { width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, flexShrink: 0 };
const donorName = { color: "white", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const donorAmount = { color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0 };

const searchScreen = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: APP_BG, color: "white", zIndex: 60, display: "flex", flexDirection: "column", boxSizing: "border-box" };
const searchHeader = { padding: "14px 12px", display: "flex", alignItems: "center", gap: 10 };
const backBtn = { width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "none", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 };
const searchInputWrap = { flex: 1, height: 42, borderRadius: 20, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 14px", gap: 10 };
const searchInput = { flex: 1, border: "none", background: "transparent", color: "white", outline: "none", fontSize: 15 };
const searchIconInline = { color: "rgba(255,255,255,0.5)", fontSize: 14 };
const searchBody = { padding: "10px 14px 60px", overflowY: "auto", flex: 1 };
const searchSectionTitle = { fontSize: 16, fontWeight: 700, marginBottom: 12 };
const searchHistoryList = { display: "flex", flexDirection: "column", gap: 10 };
const searchHistoryItem = { minHeight: 46, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "none", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", fontSize: 14, cursor: "pointer" };
const searchSectionRow = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 };
const saveSearchBtn = { background: "none", border: "none", color: "#9ea7ff", cursor: "pointer" };
const searchResultsList = { display: "flex", flexDirection: "column", gap: 10 };
const searchResultCard = { background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" };
const searchResultLeft = { display: "flex", alignItems: "center", gap: 12 };
const searchResultThumb = { width: 44, height: 44, borderRadius: 12, background: ACCENT, color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const searchResultMeta = { display: "flex", flexDirection: "column" };
const searchResultTitle = { fontSize: 14, fontWeight: 700, color: "white" };
const searchResultSub = { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 };
const searchOpenBtn = { background: ACCENT, border: "none", padding: "8px 16px", borderRadius: 12, color: "white", fontWeight: 700, cursor: "pointer" };
const searchEmptyState = { textAlign: "center", marginTop: 40, color: "rgba(255,255,255,0.5)" };
const searchEmptyTitle = { fontSize: 16, fontWeight: 700, color: "white" };
const searchEmptyText = { marginTop: 8, fontSize: 14 };

const messagesScreen = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: APP_BG, color: "white", zIndex: 65, display: "flex", flexDirection: "column", boxSizing: "border-box" };
const messagesBody = { padding: "8px 14px 60px", overflowY: "auto", flex: 1 };
const messagesList = { display: "flex", flexDirection: "column", gap: 10 };

const messageThreadRow = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  borderRadius: 16
};

const messageThreadDeleteArea = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  width: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #ff5f6d, #c81d25)"
};

const messageThreadDeleteBtn = {
  width: 48,
  height: 48,
  borderRadius: 14,
  border: "none",
  background: "rgba(255,255,255,0.14)",
  color: "white",
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

const messageThreadCard = {
  width: "100%",
  height: 60,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: "6px 10px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  color: "white",
  cursor: "pointer",
  boxSizing: "border-box",
  position: "relative",
  zIndex: 1,
  transform: "translateX(0)",
  transition: "transform 0.22s ease",
  overflow: "hidden"
};

const messageThreadCardSwiped = {
  transform: "translateX(-56px)"
};

const messageThreadAvatarWrap = { position: "relative", flexShrink: 0 };

const messageThreadAvatar = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: 16,
  fontWeight: 700,
  boxShadow: "0 6px 14px rgba(0,0,0,0.2)"
};

const messageThreadOnlineDot = {
  position: "absolute",
  right: 2,
  bottom: 2,
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "#5df2a8",
  border: "2px solid #110b1c"
};

const messageThreadAvatarUnread = {
  position: "absolute",
  top: -2,
  right: -2,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  borderRadius: 9,
  background: "linear-gradient(135deg, #ff5f6d, #ff7b89)",
  color: "white",
  fontSize: 10,
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #110b1c",
  boxSizing: "border-box"
};

const messageThreadMain = {
  minWidth: 0,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 4
};

const messageThreadTopRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10
};

const messageThreadName = {
  fontSize: 15,
  fontWeight: 700,
  color: "white",
  textAlign: "left"
};

const messageThreadTime = {
  fontSize: 11,
  color: "rgba(255,255,255,0.5)",
  flexShrink: 0
};

const messageThreadPreviewRow = {
  display: "flex",
  alignItems: "center"
};

const messageThreadUsername = {
  fontSize: 11,
  color: "rgba(255,255,255,0.45)",
  textAlign: "left"
};

const messageThreadBottomRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10
};

const messageThreadText = {
  fontSize: 13,
  color: "rgba(255,255,255,0.68)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "left",
  minWidth: 0,
  flex: 1
};

const messageThreadUnread = {
  minWidth: 20,
  height: 20,
  borderRadius: 10,
  padding: "0 6px",
  background: "rgba(124,92,255,0.22)",
  color: "white",
  fontSize: 11,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "1px solid rgba(124,92,255,0.35)"
};

const messagesEmptyState = {
  textAlign: "center",
  marginTop: 60,
  color: "rgba(255,255,255,0.5)"
};
const directChatScreen = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: APP_BG, color: "white", zIndex: 66, display: "flex", flexDirection: "column", boxSizing: "border-box" };
const directChatHeader = { padding: "14px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" };
const directChatProfileBtn = { flex: 1, background: "transparent", border: "none", padding: 0, cursor: "pointer", minWidth: 0 };
const directChatHeaderCenter = { flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 };
const directChatHeaderAvatar = { width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700, flexShrink: 0, boxShadow: "0 6px 14px rgba(0,0,0,0.2)" };const directChatHeaderMeta = { display: "flex", flexDirection: "column", minWidth: 0 };
const directChatHeaderName = { color: "white", fontSize: 15, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const directChatHeaderSub = { marginTop: 2, color: "rgba(255,255,255,0.55)", fontSize: 12 };
const directChatMessagesArea = { flex: 1, overflowY: "auto", padding: "14px 12px 10px" };
const directChatMessagesList = { display: "flex", flexDirection: "column", gap: 10 };
const directChatBubble = { maxWidth: "78%", padding: "10px 12px", borderRadius: 16, fontSize: 14, lineHeight: 1.35, wordBreak: "break-word" };
const directChatBubbleMine = { alignSelf: "flex-end", background: "linear-gradient(135deg, rgba(124,92,255,0.9), rgba(60,199,216,0.9))", color: "white", borderBottomRightRadius: 6 };
const directChatBubbleOther = { alignSelf: "flex-start", background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.06)", borderBottomLeftRadius: 6 };
const directChatInputBar = { padding: "10px 8px", display: "flex", alignItems: "center", gap: 3, borderTop: "1px solid rgba(255,255,255,0.06)" };
const directChatInputWrap = { flex: 1, minWidth: 0 };
const directChatInput = { width: "100%", height: 38, borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.08)", color: "white", padding: "0 12px", outline: "none", fontSize: 14, boxSizing: "border-box" };

const profileScreen = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 70, background: APP_BG, color: "white", display: "flex", flexDirection: "column", boxSizing: "border-box" };
const profileHeader = { padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" };
const profileHeaderTitle = { fontSize: 18, fontWeight: 700 };
const profileHeaderBtn = { background: "rgba(255,255,255,0.1)", border: "none", width: 36, height: 36, borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const profileBody = { padding: "10px 16px 60px", overflowY: "auto", flex: 1 };
const profileAvatarLargeWrap = { position: "relative", width: 96, height: 96, margin: "0 auto" };
const profileAvatarLarge = { width: "100%", height: "100%", borderRadius: "50%", backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop')", backgroundSize: "cover" };
const profileContactAvatarLarge = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: 34,
  fontWeight: 800,
  boxShadow: "0 12px 28px rgba(0,0,0,0.28)"
};

const profileContactOnlineBadge = {
  position: "absolute",
  right: 2,
  bottom: 4,
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: "#5df2a8",
  border: "3px solid #110b1c"
};
const profileName = { textAlign: "center", fontSize: 24, fontWeight: 700, marginTop: 16 };
const profileUsername = { textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 };
const profileStatsRow = { display: "flex", justifyContent: "space-around", marginTop: 24 };
const profileStatBlock = { textAlign: "center" };
const profileStatValue = { fontSize: 22, fontWeight: 700 };
const profileStatLabel = { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 };
const profileBio = { textAlign: "center", marginTop: 20, fontSize: 14, lineHeight: 1.5 };
const profileMainBtn = { width: "100%", height: 46, borderRadius: 24, background: ACCENT, border: "none", color: "white", fontWeight: 700, fontSize: 15, marginTop: 20, cursor: "pointer", boxShadow: "0 8px 20px rgba(124,92,255,0.22)" };
const profileTabs = { display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", marginTop: 20 };
const profileTabBtn = { flex: 1, padding: "12px 0", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 20, display: "flex", justifyContent: "center", cursor: "pointer" };
const profileGrid = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 };
const profileGridItem = { width: "100%" };
const profileGridThumb = { position: "relative", aspectRatio: "3/4", borderRadius: 12, display: "flex", alignItems: "flex-end", padding: "10px" };
const profileGridOverlay = { position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)", borderRadius: 12 };
const profileGridBottom = { position: "relative", zIndex: 1, display: "flex", alignItems: "center", color: "white" };
const profileGridViews = { marginLeft: 6, fontSize: 12, fontWeight: 700 };

const settingsHeaderSpacer = { width: 36, height: 36 };
const settingsBody = { padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 };
const settingsItem = { width: "100%", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.04)", color: "white", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", boxSizing: "border-box" };
const settingsItemLeft = { display: "flex", alignItems: "center", gap: 12, fontSize: 15, fontWeight: 600 };
const settingsItemIcon = { color: "#9ea7ff", fontSize: 16 };
const settingsArrow = { color: "rgba(255,255,255,0.45)", fontSize: 14 };
const subpageWrap = { flex: 1, padding: "16px", display: "flex", alignItems: "flex-start" };
const subpageCard = { width: "100%", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px 16px", boxSizing: "border-box" };
const subpageTitle = { color: "white", fontSize: 18, fontWeight: 700 };
const subpageSubtitle = { marginTop: 8, color: "rgba(255,255,255,0.55)", fontSize: 13 };
const subpageContent = { marginTop: 18, whiteSpace: "pre-line", color: "rgba(255,255,255,0.92)", fontSize: 15, lineHeight: 1.5 };

const profileCardCentered = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", background: "#110b1c", borderRadius: 24, padding: "20px", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 16px 40px rgba(0,0,0,0.5)", animation: "modalInCenter 0.2s ease-out forwards", boxSizing: "border-box" };
const profileCardCloseCentered = { position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.1)", color: "white", cursor: "pointer" };
const profileCardAvatarBig = { width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #37c5d6, #6b5cff)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 };
const profileCardNameBig = { color: "white", fontSize: 18, fontWeight: 800, marginTop: 12 };
const profileCardUsernameBig = { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 };
const profileCardLivePill = { marginTop: 12, padding: "6px 16px", borderRadius: 20, background: "rgba(255, 45, 85, 0.15)", border: "1px solid rgba(255, 45, 85, 0.3)", color: "#ff4d6d", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 };
const profileCardStatsCompact = { width: "100%", marginTop: 20, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 };
const profileCardCompactItem = { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" };
const profileCardCompactIcon = { color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 8 };
const profileCardCompactValue = { color: "white", fontSize: 14, fontWeight: 800 };
const profileCardCompactLabel = { marginTop: 4, color: "rgba(255,255,255,0.4)", fontSize: 10 };
const profileCardBtn = { marginTop: 20, width: "100%", height: 44, border: "none", borderRadius: 14, background: "linear-gradient(90deg, #6a57ff, #42cbf4)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer" };
const streamSetupOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.58)",
  zIndex: 120
};

const streamSetupModal = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 310,
  padding: 18,
  borderRadius: 22,
  background: "rgba(18, 20, 28, 0.97)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
  zIndex: 121,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  boxSizing: "border-box"
};

const streamSetupTitle = {
  color: "white",
  fontSize: 20,
  fontWeight: 800,
  textAlign: "center"
};

const streamSetupSubtitle = {
  color: "rgba(255,255,255,0.62)",
  fontSize: 12,
  textAlign: "center"
};

const streamAvatarUpload = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  color: "white",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer"
};

const streamAvatarPreview = {
  width: 78,
  height: 78,
  borderRadius: "50%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  border: "2px solid rgba(255,255,255,0.22)"
};

const streamSetupInput = {
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  padding: "0 14px",
  outline: "none",
  fontSize: 14
};

const streamStartBtn = {
  height: 44,
  border: "none",
  borderRadius: 16,
  background: ACCENT,
  color: "white",
  fontSize: 14,
  fontWeight: 800,
  cursor: "pointer"
};

const countdownOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  color: "white",
  zIndex: 130,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 92,
  fontWeight: 900
};