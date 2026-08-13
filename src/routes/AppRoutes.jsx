/**
 * AppRoutes Configuration (Phase 4 - Complete Instructor & Partner Panel)
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { RoleProtectedRoute } from '../components/auth/RoleProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';

// Student Pages (Phase 3 Interactive)
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { EvaluationPage } from '../pages/student/EvaluationPage';
import { MyProgramPage } from '../pages/student/MyProgramPage';
import { ClassesPage } from '../pages/student/ClassesPage';
import { LibraryPage } from '../pages/student/LibraryPage';
import { ExercisesPage } from '../pages/student/ExercisesPage';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';

// Instructor / Admin Pages (Phase 4 Interactive)
import { InstructorDashboard } from '../pages/instructor/InstructorDashboard';
import { ManageStudentsPage } from '../pages/instructor/ManageStudentsPage';
import { ManageProgramsPage } from '../pages/instructor/ManageProgramsPage';
import { ManageClassesPage } from '../pages/instructor/ManageClassesPage';
import { ManageExercisesPage } from '../pages/instructor/ManageExercisesPage';

export const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student Protected Routes */}
        <Route
          path="/app/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/app/evaluacion"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <EvaluationPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/app/programa"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <MyProgramPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/app/clases"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <ClassesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/app/biblioteca"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <LibraryPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/app/ejercicios"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <ExercisesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/app/perfil"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <StudentProfilePage />
            </RoleProtectedRoute>
          }
        />

        {/* Instructor / Admin / Partner Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/alumnos"
          element={
            <RoleProtectedRoute allowedRoles={['instructor', 'admin']}>
              <ManageStudentsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/programas"
          element={
            <RoleProtectedRoute allowedRoles={['instructor', 'admin']}>
              <ManageProgramsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/clases"
          element={
            <RoleProtectedRoute allowedRoles={['instructor', 'admin']}>
              <ManageClassesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/ejercicios"
          element={
            <RoleProtectedRoute allowedRoles={['instructor', 'admin']}>
              <ManageExercisesPage />
            </RoleProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};
