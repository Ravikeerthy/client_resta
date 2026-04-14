import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import AuthSplitLayout from "../../components/layout/AuthSplitLayout";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(null);
        await login(values);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        setStatus(
          error?.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthSplitLayout
      title="Welcome back"
      subtitle="Sign in to continue managing your restaurant workflow."
    >
      <Card sx={{ borderRadius: 5, boxShadow: "0 14px 36px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            {formik.status && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formik.status}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.3 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          <Typography sx={{ mt: 3 }} variant="body2">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </AuthSplitLayout>
  );
};

export default LoginPage;