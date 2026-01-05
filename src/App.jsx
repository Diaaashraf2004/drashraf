import React, { useState } from 'react';
import { FileText, UserCheck, ArrowRight, Home, AlertCircle, CheckCircle, FileCheck, Info, Users, ClipboardList, Building2, Award } from 'lucide-react';

// المكون الرئيسي للتطبيق
export default function App() {
  // حالة للتحكم في الصفحة المعروضة حالياً
  const [currentPage, setCurrentPage] = useState('home');

  // حالات خاصة بصفحة استخراج الشهادات
  const [certType, setCertType] = useState('ابتدائية');
  const [certYear, setCertYear] = useState('');
  const [applicantRole, setApplicantRole] = useState('صاحب الطلب نفسه');
  const [certError, setCertError] = useState('');
  const [showCertRequirements, setShowCertRequirements] = useState(false);

  // دالة لتغيير الصفحة وإعادة تعيين الحالات
  const navigateTo = (page) => {
    setCurrentPage(page);
    setCertError('');
    setShowCertRequirements(false);
    setCertYear('');
    setApplicantRole('صاحب الطلب نفسه');
  };

  // دالة معالجة طلب الشهادة
  const handleCertCheck = (e) => {
    e.preventDefault();
    setCertError('');
    setShowCertRequirements(false);

    if (!certYear) {
      setCertError('يرجى إدخال سنة الشهادة');
      return;
    }

    const yearNum = parseInt(certYear);
    const maxYear = certType === 'ابتدائية' ? 1988 : 2009;

    if (yearNum > maxYear) {
      setCertError(`عفواً، لا يتم استخراج شهادات (${certType}) للسنوات ما بعد ${maxYear} من خلال هذا النظام. يرجى مراجعة الإدارة التعليمية.`);
      return;
    }

    setShowCertRequirements(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-right">
      {/* رأس الصفحة (Header) */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer" onClick={() => navigateTo('home')}>
            <FileCheck size={28} className="text-blue-300" />
            <h1 className="text-xl font-bold">بوابة الخدمات التعليمية</h1>
          </div>
          {currentPage !== 'home' && (
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center text-sm bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded transition shadow-sm"
            >
              <Home size={16} className="ml-1" />
              الرئيسية
            </button>
          )}
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 py-10">
        
        {/* الصفحة الرئيسية */}
        {currentPage === 'home' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">مرحباً بك في البوابة الإلكترونية</h2>
              <p className="text-gray-600 mb-8">اختر الخدمة التي تريد القيام بها من القائمة أدناه</p>
              
              {/* جهة تقديم الخدمة الرسمية */}
              <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-sm inline-flex items-center justify-center mx-auto max-w-3xl transform transition-all hover:shadow-md">
                <div className="bg-blue-50 p-4 rounded-full text-blue-700 ml-5 border border-blue-100">
                  <Building2 size={32} />
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">جهة تقديم الخدمة الرسمية</p>
                  <p className="text-blue-900 text-xl font-bold leading-tight">
                    إدارة شئون الطلبة والامتحانات بمديرية التربية والتعليم بالغربية
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => navigateTo('certificates')}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">بيان نجاح</h3>
                <p className="text-gray-500 mb-4">بيان نجاح (ابتدائية - اعدادية - دبلومات - ثانوية عامة).</p>
                <span className="text-blue-600 font-medium flex items-center group-hover:underline">
                  البدء في الخدمة <ArrowRight size={16} className="mr-2" />
                </span>
              </div>

              <div 
                onClick={() => navigateTo('correction')}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <UserCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">تصويب الاسم</h3>
                <p className="text-gray-500 mb-4">خدمة مخصصة للمرحلة الإعدادية لتصحيح بيانات الاسم.</p>
                <span className="text-emerald-600 font-medium flex items-center group-hover:underline">
                  البدء في الخدمة <ArrowRight size={16} className="mr-2" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* صفحة استخراج الشهادات */}
        {currentPage === 'certificates' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in border-t-4 border-blue-600">
            <div className="flex items-center mb-6 border-b pb-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600 ml-4">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">بيانات الشهادة المطلوبة</h2>
                <p className="text-sm text-gray-500">أدخل نوع وتاريخ الشهادة لمعرفة المتطلبات</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleCertCheck}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">نوع الشهادة</label>
                  <select 
                    value={certType}
                    onChange={(e) => {
                      setCertType(e.target.value);
                      setShowCertRequirements(false);
                      setCertError('');
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="ابتدائية">ابتدائية</option>
                    <option value="اعدادية">اعدادية</option>
                    <option value="اعدادية مهنية">اعدادية مهنية</option>
                    <option value="دبلومات">دبلومات</option>
                    <option value="ثانوية عامة">ثانوية عامة</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">سنة الشهادة</label>
                  <input 
                    type="number" 
                    placeholder="مثال: 2005" 
                    value={certYear}
                    onChange={(e) => {
                      setCertYear(e.target.value);
                      setShowCertRequirements(false);
                      setCertError('');
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    مسموح حتى سنة {certType === 'ابتدائية' ? '1988' : '2009'} فقط
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">من له الحق في استلام الشهادة</label>
                  <select
                    value={applicantRole}
                    onChange={(e) => {
                      setApplicantRole(e.target.value);
                      setShowCertRequirements(false);
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="صاحب الطلب نفسه">صاحب الطلب نفسه</option>
                    <option value="الاب او الام لصاحب الطلب">الاب او الام لصاحب الطلب</option>
                    <option value="الاقارب من الدرجة الثانية لصاحب الطلب">الاقارب من الدرجة الثانية لصاحب الطلب</option>
                    <option value="او من ينوب عنه بتوكيل">او من ينوب عنه بتوكيل</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
                  عرض المتطلبات والشروط
                </button>
              </div>

              {certError && (
                <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-md flex items-start animate-fade-in">
                  <AlertCircle className="text-red-500 ml-3 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-bold text-red-800 text-sm">تنبيه هام</h3>
                    <p className="text-red-700 text-sm mt-1">{certError}</p>
                  </div>
                </div>
              )}

              {showCertRequirements && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6 animate-fade-in">
                  <div className="flex items-center mb-4 text-green-800">
                    <CheckCircle className="ml-2" size={24} />
                    <h3 className="font-bold text-lg">البيانات مقبولة</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 font-medium">
                      المطلوب لاستخراج شهادة <span className="text-blue-600 font-bold">({certType})</span> لسنة <span className="text-blue-600 font-bold">({certYear})</span>:
                    </p>
                    <p className="text-gray-600 text-sm -mt-2">
                      صفة المستلم: <span className="font-bold">{applicantRole}</span>
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ml-3 mt-0.5">1</span>
                          <span className="text-gray-700">حوالة بريدية موجهة إلى <span className="font-bold">مديرية التربية والتعليم</span>.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ml-3 mt-0.5">2</span>
                          <span className="text-gray-700">طابع دعم تعليمي.</span>
                        </li>
                        {applicantRole === 'او من ينوب عنه بتوكيل' && (
                          <li className="flex items-start">
                            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ml-3 mt-0.5">3</span>
                            <span className="text-gray-700">أصل التوكيل وصورة منه للاطلاع.</span>
                          </li>
                        )}
                        {(applicantRole === 'الاب او الام لصاحب الطلب' || applicantRole === 'الاقارب من الدرجة الثانية لصاحب الطلب') && (
                          <li className="flex items-start">
                            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ml-3 mt-0.5">3</span>
                            <span className="text-gray-700">بطاقة الرقم القومي للمستلم وشهادة ميلاد الطالب لإثبات صلة القرابة.</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800 flex items-start">
                      <Info size={16} className="ml-2 mt-0.5" />
                      يرجى التوجه بهذه الأوراق إلى شباك تقديم الطلبات لاستلام الشهادة.
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* صفحة تصويب الاسم - تم إزالة النموذج وإبقاء المعلومات والتنبيه فقط */}
        {currentPage === 'correction' && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in border-t-4 border-emerald-500">
            <div className="mb-8 border-b pb-4">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 ml-4">
                  <UserCheck size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">طلب تصويب اسم</h2>
              </div>
              
              {/* التنبيه - تم إبقاؤه كما هو */}
              <div className="bg-amber-50 border-r-4 border-amber-500 p-4 rounded-lg flex items-center shadow-sm">
                <AlertCircle className="text-amber-600 ml-3 flex-shrink-0" size={28} />
                <div>
                  <h3 className="font-bold text-amber-900 text-lg">تنبيه هام</h3>
                  <p className="text-amber-800 font-medium text-base">
                    عفواً، هذه الخدمة متاحة حالياً <span className="font-bold underline">للمرحلة الإعدادية فقط</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* قسم المستندات المطلوبة وآلية العمل */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-emerald-900 mb-4 flex items-center">
                <ClipboardList className="ml-2" size={20} />
                المستندات المطلوبة لتصويب الاسم:
              </h3>
              <ul className="space-y-3 bg-white p-5 rounded-lg border border-emerald-100">
                {[
                  "شهادة الميلاد الاصلية",
                  "صورة بطاقة الرقم القومي",
                  "نموذج تصحيح رقم 24 من الاحوال المدنية",
                  "قيد عائلي مميكن لصاحب الطلب",
                  "مذكرة من شئون الطلبة معتمدة من السيد وكيل وزارة التربية والتعليم",
                  "مستخرج الشهادة الاصلية التي بها خطأ"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ml-3 mt-0.5 flex-shrink-0">{index + 1}</span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 bg-white border-r-8 border-emerald-600 p-6 rounded-xl shadow-md transform transition-all hover:translate-x-1">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full shadow-sm ml-4 flex-shrink-0">
                     <Info size={32} className="text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-emerald-900 text-xl mb-3">آلية العمل بعد التقديم:</h3>
                    <p className="text-gray-700 text-lg leading-relaxed font-medium mb-4">
                      يتم تشكيل <span className="font-bold text-emerald-800 underline decoration-emerald-400">لجنة خاصة من الشئون القانونية</span> لفحص المستندات وإجراء التصحيح.
                    </p>
                    <div className="flex items-center bg-emerald-50 border border-emerald-100 p-3 rounded-lg w-fit">
                        <span className="text-emerald-800 ml-2 font-bold">⏱️ مدة استخراج التصحيح:</span>
                        <span className="bg-emerald-600 text-white font-bold px-4 py-1 rounded-md shadow-sm text-lg">أسبوع واحد</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* أضفت زر للعودة بما أن النموذج تم حذفه */}
            <div className="mt-8 pt-4 border-t text-center">
               <button 
                  onClick={() => navigateTo('home')}
                  className="px-8 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 font-bold transition"
                >
                  العودة للرئيسية
                </button>
            </div>
          </div>
        )}

      </main>

      {/* تذييل الصفحة */}
      <footer className="bg-gray-800 text-gray-400 py-10 mt-12 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mb-6">جميع الحقوق محفوظة © {new Date().getFullYear()} - بوابة الخدمات الإلكترونية</p>
          
          <div className="inline-flex items-center justify-center gap-3 bg-gray-900 border border-gray-600 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Award className="text-yellow-500" size={24} />
            <span className="text-gray-300 font-medium">إشراف عام وتطوير:</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-bold text-lg">
              د/ عفاف حمدي محمود
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}