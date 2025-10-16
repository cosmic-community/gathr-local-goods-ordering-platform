import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { supabase } from '@/lib/supabase'
import { AuthState, User } from '@/types'

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase().auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    // Fetch user profile with role
    const { data: profile, error: profileError } = await supabase()
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()
    
    if (profileError) throw profileError
    
    return profile as User
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ 
    email, 
    password, 
    name, 
    role 
  }: { 
    email: string
    password: string
    name: string
    role: 'customer' | 'merchant' | 'delivery'
  }) => {
    const { data, error } = await supabase().auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    if (!data.user) throw new Error('Sign up failed')
    
    // Create user profile
    const { data: profile, error: profileError } = await supabase()
      .from('users')
      .insert({
        id: data.user.id,
        email,
        name,
        role,
      })
      .select()
      .single()
    
    if (profileError) throw profileError
    
    return profile as User
  }
)

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const { error } = await supabase().auth.signOut()
  if (error) throw error
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Sign in failed'
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Sign up failed'
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { setUser, clearError } = authSlice.actions
export default authSlice.reducer