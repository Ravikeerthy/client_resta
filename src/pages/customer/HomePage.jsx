import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Footer from "../../components/layout/Footer";
import { Link as RouterLink } from "react-router-dom";
import MainNavBar from "../../components/layout/MainNavBars";
import SmokeBackGround from "../../components/common/SmokeBackgrounds";


const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    title: "Taste the warmth of a real dining experience",
    subtitle:
      "Freshly prepared dishes, elegant ambience, and a modern restaurant journey from menu to table.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
    title: "From dine-in evenings to takeaway cravings",
    subtitle:
      "Discover signature flavors, smooth ordering, and a beautiful restaurant experience for every occasion.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    title: "Food that looks premium and feels memorable",
    subtitle:
      "Curated dishes, welcoming interiors, and service designed for customers, waiters, and kitchen teams.",
  },
];

const specials = [
  {
    name: "Signature Chicken Biryani",
    tag: "Chef Special",
    price: "₹ 220",
    image:
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80", 
   description: "Fragrant basmati rice, slow-cooked spices, and rich layered flavor.",
  },
  {
    name: "Paneer Tikka Platter",
    tag: "Popular Starter",
    price: "₹ 180",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
    description: "Smoky grilled paneer cubes served with mint chutney and salad.",
  },
  {
    name: "Classic Cheese Burger",
    tag: "Best Seller",
    price: "₹ 160",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    description: "Juicy patty, soft bun, melted cheese, and crisp fresh toppings.",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1200&q=80",
];

const reviews = [
  {
    name: "Akhila",
    role: "Weekend Diner",
    rating: 5,
    text: "The food presentation, ambience, and ordering flow all felt premium. It genuinely looks like a real restaurant brand.",
  },
  {
    name: "Raghav",
    role: "Family Customer",
    rating: 5,
    text: "Loved the modern feel of the experience. The menu sections, visuals, and layout feel polished and welcoming.",
  },
  {
    name: "Meera",
    role: "Regular Visitor",
    rating: 4,
    text: "Very smooth and classy homepage. It gives a proper restaurant vibe instead of looking like a generic software dashboard.",
  },
];

const stats = [
  { value: "12K+", label: "Happy Customers" },
  { value: "35+", label: "Signature Dishes" },
  { value: "4.8", label: "Average Rating" },
  { value: "7 Days", label: "Open Every Week" },
];

const RevealSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(36px)",
        transition: `all 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
};

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = useMemo(() => heroSlides[activeSlide], [activeSlide]);

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <>
    <MainNavBar />
    <SmokeBackGround>
        <Box sx={{ pb: 8 }}>
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: "78vh", md: "88vh" },
              overflow: "hidden",
            }}
          >
            {heroSlides.map((slide, index) => (
              <Box
                key={slide.title}
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: activeSlide === index ? 1 : 0,
                  transition: "opacity 900ms ease",
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.18) 100%), url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: activeSlide === index ? "scale(1)" : "scale(1.05)",
                }}
              />
            ))}

            <Container
              maxWidth="xl"
              sx={{
                position: "relative",
                zIndex: 2,
                minHeight: { xs: "78vh", md: "88vh" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                  gap: 5,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box>
                  <RevealSection>
                    <Chip
                      label="Authentic Restaurant Experience"
                      sx={{
                        mb: 2,
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.16)",
                        backdropFilter: "blur(8px)",
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 900,
                        lineHeight: 1.08,
                        fontSize: { xs: "2.4rem", md: "4.5rem" },
                        maxWidth: 780,
                      }}
                    >
                      {currentSlide.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.88)",
                        mt: 2.5,
                        maxWidth: 640,
                        lineHeight: 1.8,
                        fontSize: { xs: "1rem", md: "1.08rem" },
                      }}
                    >
                      {currentSlide.subtitle}
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{ mt: 4 }}
                    >
                      <Button
                        component={RouterLink}
                        to="/menu"
                        variant="contained"
                        size="large"
                        sx={{ px: 4, py: 1.4 }}
                      >
                        View Full Menu
                      </Button>

                      <Button
                        component={RouterLink}
                        to="/register"
                        variant="outlined"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.4,
                          color: "#fff",
                          borderColor: "rgba(255,255,255,0.5)",
                          "&:hover": {
                            borderColor: "#fff",
                            backgroundColor: "rgba(255,255,255,0.08)",
                          },
                        }}
                      >
                        Reserve Your Spot
                      </Button>
                    </Stack>
                  </RevealSection>
                </Box>

                <Box />
              </Box>
            </Container>

            <Box
              sx={{
                position: "absolute",
                right: { xs: 16, md: 32 },
                bottom: 24,
                zIndex: 3,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                onClick={goPrev}
                sx={{
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                }}
              >
                <KeyboardArrowLeftRoundedIcon />
              </IconButton>
              <IconButton
                onClick={goNext}
                sx={{
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                }}
              >
                <KeyboardArrowRightRoundedIcon />
              </IconButton>
            </Box>
          </Box>

          <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 9 } }}>
            <RevealSection>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {stats.map((stat) => (
                  <Box key={stat.label}>
                    <Card
                      sx={{
                        borderRadius: 5,
                        textAlign: "center",
                        boxShadow: "0 14px 36px rgba(0,0,0,0.06)",
                      }}
                    >
                      <CardContent sx={{ py: 4 }}>
                        <Typography
                          variant="h4"
                          color="primary"
                          sx={{ fontWeight: 900 }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </RevealSection>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <RevealSection>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80"
                      alt="Restaurant ambience"
                      sx={{
                        width: "100%",
                        height: { xs: 300, md: 460 },
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="overline"
                    color="primary"
                    sx={{ fontWeight: 700, letterSpacing: 1.2 }}
                  >
                    OUR STORY
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>
                    A restaurant built around flavor, comfort, and atmosphere
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 2.5, lineHeight: 1.9 }}
                  >
                    We wanted the homepage to feel like a real restaurant brand,
                    not a generic software landing page. The idea is to bring
                    food, ambience, and modern service into one seamless
                    experience.
                  </Typography>

                  <Stack spacing={2} sx={{ mt: 4 }}>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <RestaurantMenuRoundedIcon color="primary" />
                      <Typography>Curated chef specials and signature dishes</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <AccessTimeRoundedIcon color="primary" />
                      <Typography>Fast dine-in, takeaway, and delivery workflow</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <DeliveryDiningRoundedIcon color="primary" />
                      <Typography>Smooth service for customers, waiters, and kitchen staff</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <LocationOnRoundedIcon color="primary" />
                      <Typography>Warm ambience designed for memorable dining</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </RevealSection>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <RevealSection delay={100}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="primary"
                  sx={{ fontWeight: 700, letterSpacing: 1.2 }}
                >
                  CHEF’S SPECIALS
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>
                  Signature plates everyone comes back for
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {specials.map((item) => (
                  <Box key={item.name}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 6,
                        overflow: "hidden",
                        boxShadow: "0 14px 36px rgba(0,0,0,0.06)",
                        transition: "transform 250ms ease",
                        "&:hover": {
                          transform: "translateY(-6px)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="260"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Chip label={item.tag} color="secondary" size="small" />
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: 800 }}>
                          {item.name}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.8 }}>
                          {item.description}
                        </Typography>
                        <Typography
                          color="primary"
                          sx={{ mt: 2.5, fontWeight: 900, fontSize: "1.1rem" }}
                        >
                          {item.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </RevealSection>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <RevealSection delay={100}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="primary"
                  sx={{ fontWeight: 700, letterSpacing: 1.2 }}
                >
                  MOST ORDERED
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>
                  Dishes customers love the most
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {specials.map((item, index) => (
                  <Box key={`${item.name}-${index}`}>
                    <Card
                      sx={{
                        borderRadius: 5,
                        overflow: "hidden",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {item.name}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                          {index === 0
                            ? "1,240+ orders"
                            : index === 1
                            ? "940+ orders"
                            : "860+ orders"}
                        </Typography>
                        <Typography color="primary" sx={{ mt: 2, fontWeight: 800 }}>
                          {item.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </RevealSection>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <RevealSection delay={120}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="primary"
                  sx={{ fontWeight: 700, letterSpacing: 1.2 }}
                >
                  GALLERY
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>
                  A quick look at the atmosphere
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {gallery.map((image, index) => (
                  <Box key={image}>
                    <Box
                      component="img"
                      src={image}
                      alt={`Restaurant gallery ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: 280,
                        objectFit: "cover",
                        borderRadius: 5,
                        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </RevealSection>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <RevealSection delay={150}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="overline"
                  color="primary"
                  sx={{ fontWeight: 700, letterSpacing: 1.2 }}
                >
                  CUSTOMER REVIEWS
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>
                  What our guests say
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {reviews.map((review) => (
                  <Box key={review.name}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 5,
                        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar>{review.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>
                              {review.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {review.role}
                            </Typography>
                          </Box>
                        </Stack>

                        <Rating value={review.rating} readOnly sx={{ mt: 2 }} />

                        <Typography
                          color="text.secondary"
                          sx={{ mt: 2, lineHeight: 1.85 }}
                        >
                          {review.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </RevealSection>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <RevealSection delay={170}>
              <Card
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, rgba(198,40,40,1) 0%, rgba(255,179,0,0.95) 100%)",
                  color: "#fff",
                  boxShadow: "0 18px 44px rgba(0,0,0,0.10)",
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1.3fr 0.7fr" },
                      gap: 3,
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        Ready for your next dining experience?
                      </Typography>
                      <Typography sx={{ mt: 1.5, opacity: 0.92, lineHeight: 1.8 }}>
                        Explore the menu, sign up, and enjoy a premium restaurant
                        experience built around great food and smooth service.
                      </Typography>
                    </Box>

                    <Box>
                      <Stack
                        direction={{ xs: "column", sm: "row", md: "column" }}
                        spacing={2}
                      >
                        <Button
                          component={RouterLink}
                          to="/menu"
                          variant="contained"
                          sx={{
                            bgcolor: "#fff",
                            color: "primary.main",
                            "&:hover": { bgcolor: "#fff" },
                          }}
                        >
                          Explore Menu
                        </Button>
                        <Button
                          component={RouterLink}
                          to="/register"
                          variant="outlined"
                          sx={{
                            color: "#fff",
                            borderColor: "rgba(255,255,255,0.65)",
                            "&:hover": {
                              borderColor: "#fff",
                              backgroundColor: "rgba(255,255,255,0.08)",
                            },
                          }}
                        >
                          Sign Up
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </RevealSection>
          </Container>
        </Box>
      </SmokeBackGround>

      <Footer />
    </>
  );
};

export default HomePage;