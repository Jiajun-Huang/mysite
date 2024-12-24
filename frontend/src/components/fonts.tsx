import localFont from "next/font/local";
/**
 * 
 * Building Next.js Docker image...

> next-app-template@0.0.1 build
> next build

   ▲ Next.js 15.1.2

   Creating an optimized production build ...
(node:86424) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

<--- Last few GCs --->

[86424:00000163DC391000]   125633 ms: Scavenge (interleaved) 4084.3 (4091.7) -> 4081.4 (4100.2) MB, pooled: 0 MB, 5.13 / 0.00 ms  (average mu = 0.193, current mu = 0.142) allocation failure;
[86424:00000163DC391000]   129271 ms: Mark-Compact (reduce) 4081.8 (4100.2) -> 4081.4 (4085.7) MB, pooled: 0 MB, 3240.87 / 0.00 ms  (+ 18.6 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 3269 ms) (average mu = 0

<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 00007FF768AE44CB node::SetCppgcReference+16795
 2: 00007FF768A4D4B8 SSL_get_quiet_shutdown+97560
 3: 00007FF76974F2B1 v8::Isolate::ReportExternalAllocationLimitReached+65
 4: 00007FF76973BAF6 v8::Function::Experimental_IsNopFunction+2710
 5: 00007FF769572960 v8::internal::StrongRootAllocatorBase::StrongRootAllocatorBase+34016
 6: 00007FF76956BC5D v8::internal::StrongRootAllocatorBase::StrongRootAllocatorBase+6109
 7: 00007FF769567B7D v8::Platform::SystemClockTimeMillis+655117
 8: 00007FF768D82F0D BIO_ssl_shutdown+189
 9: 00007FF76956F4F4 v8::internal::StrongRootAllocatorBase::StrongRootAllocatorBase+20596
10: 00007FF7695D41EA v8::Locker::IsLocked+7338
11: 00007FF76923F6A6 v8::internal::Version::GetString+453958
12: 00007FF7097F027A
Static worker exited with code: 134 and signal: null
Next.js build failed failed
 */

const LXGWBright = localFont({
  src: [
    {
      path: "../styles/fonts/LXGWBright-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/LXGWBright-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/fonts/LXGWBright-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/LXGWBright-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../styles/fonts/LXGWBright-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/LXGWBright-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
  ],
});

export default LXGWBright;
