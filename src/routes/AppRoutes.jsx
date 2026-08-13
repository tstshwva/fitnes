/**
 * AppRoutes Configuration (Phase 3 - Student Experience Complete)
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

// Instructor Pages
import { InstructorDashboard } from '../pages/instructor/InstructorDashboard';
import { ManageStudentsPlaceholder } from '../pages/instructor/ManageStudentsPlaceholder';
import { ManageProgramsPlaceholder } from '../pages/instructor/ManageProgramsPlaceholder';
import { ManageClassesPlaceholder } from '../pages/instructor/ManageClassesPlaceholder';
import { ManageExercisesPlaceholder } from '../pages/instructor/ManageExercisesPlaceholder';

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

        {/* Instructor Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['instructor']}>
              <InstructorDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/alumnos"
          element={
            <RoleProtectedRoute allowedRoles={['instructor']}>
              <ManageStudentsPlaceholder />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/programas"
          element={
            <RoleProtectedRoute allowedRoles={['instructor']}>
              <ManageProgramsPlaceholder />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/clases"
          element={
            <RoleProtectedRoute allowedRoles={['instructor']}>
              <ManageClassesPlaceholder />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/ejercicios"
          element={
            <RoleProtectedRoute allowedRoles={['instructor']}>
              <ManageExercisesPlaceholder />
            </RoleProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};
