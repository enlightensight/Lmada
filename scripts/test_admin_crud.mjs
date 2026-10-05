// scripts/test_admin_crud.mjs
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('=== Starting Admin Pages & Insights CRUD Verification ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. GET all pages
    console.log('--- 1. Testing GET /api/admin/pages ---');
    const resPages = await fetch(`${BASE_URL}/api/admin/pages`);
    assert(resPages.status === 200, `GET /api/admin/pages returned status ${resPages.status}`);
    const dataPages = await resPages.json();
    assert(dataPages.success === true, 'Response success is true');
    assert(Array.isArray(dataPages.pages) && dataPages.pages.length > 0, `Returned ${dataPages.pages?.length} pages`);

    // Verify Home Page has no duplicate sections
    const homePage = dataPages.pages.find((p) => p.category === 'home' && p.slug === 'home');
    assert(Boolean(homePage), 'Found home page in list');
    const homeHasFaqSec = homePage?.sections?.some((s) => s.id === 'home-faq' || s.style === 'faq-accordion');
    const homeHasCtaSec = homePage?.sections?.some((s) => s.id === 'home-cta' || s.style === 'cta-banner');
    assert(!homeHasFaqSec, 'Home page sections do NOT contain old duplicate home-faq');
    assert(!homeHasCtaSec, 'Home page sections do NOT contain old duplicate home-cta');

    // 2. GET single page: overview/about
    console.log('\n--- 2. Testing GET /api/admin/pages/overview/about ---');
    const resAbout = await fetch(`${BASE_URL}/api/admin/pages/overview/about`);
    assert(resAbout.status === 200, `GET about page returned status ${resAbout.status}`);
    const dataAbout = await resAbout.json();
    assert(dataAbout.success === true, 'About page fetched successfully');
    assert(dataAbout.page.slug === 'about', 'Page slug is about');

    // 3. CREATE a new custom page via POST /api/admin/pages
    console.log('\n--- 3. Testing CREATE (POST /api/admin/pages) ---');
    const testPagePayload = {
      title: 'CRUD Automated Test Page',
      category: 'testcat',
      slug: 'crud-test-item',
      heading: 'Automated Testing Heading',
      subtitle: 'Testing CRUD',
      description: 'Temporary page for automated CRUD verification',
      isCustom: true,
      sections: [
        {
          id: 'sec-test-1',
          style: 'feature-split',
          title: 'Test Section One',
          subtitle: 'SECTION SUBTITLE',
          text: 'This is a test section created by automated tests.',
          dark: false,
          image: '/images/hero_cleanroom.png',
          imageSide: 'right'
        }
      ],
      faqs: [
        {
          id: 'faq-test-1',
          question: 'Is this an automated test?',
          answer: 'Yes, verifying admin CRUD functionality.'
        }
      ],
      primaryCta: { text: 'Test Action', link: '/contact' }
    };

    const resCreate = await fetch(`${BASE_URL}/api/admin/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: testPagePayload, publish: false })
    });
    assert(resCreate.status === 200, `POST created page with status ${resCreate.status}`);
    const dataCreate = await resCreate.json();
    assert(dataCreate.success === true, 'Create response success is true');
    assert(dataCreate.page?.slug === 'crud-test-item', 'Created page slug matches');
    assert(dataCreate.page?.hasUnpublishedChanges === true, 'Created page has draft status');

    // 4. READ the newly created test page
    console.log('\n--- 4. Testing READ created page (GET /api/admin/pages/testcat/crud-test-item) ---');
    const resGetTest = await fetch(`${BASE_URL}/api/admin/pages/testcat/crud-test-item`);
    assert(resGetTest.status === 200, `GET created page returned status ${resGetTest.status}`);
    const dataGetTest = await resGetTest.json();
    assert(dataGetTest.page?.title === 'CRUD Automated Test Page', 'Retrieved page title matches');

    // 5. UPDATE (Save Draft)
    console.log('\n--- 5. Testing UPDATE (PUT action: save_draft) ---');
    const updatedDraft = {
      ...dataGetTest.page,
      title: 'CRUD Automated Test Page - Updated Draft',
      ctaTitle: 'Ready to partner with us?',
      ctaSubtitle: 'Get started today with automated workflows.'
    };
    const resDraft = await fetch(`${BASE_URL}/api/admin/pages/testcat/crud-test-item`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: updatedDraft, action: 'save_draft' })
    });
    assert(resDraft.status === 200, `PUT save_draft returned status ${resDraft.status}`);
    const dataDraft = await resDraft.json();
    assert(dataDraft.success === true, 'Save draft response success is true');
    assert(dataDraft.page?.title === 'CRUD Automated Test Page - Updated Draft', 'Updated title reflected');
    assert(dataDraft.page?.hasUnpublishedChanges === true, 'Draft changes recorded');

    // 6. PUBLISH Page
    console.log('\n--- 6. Testing PUBLISH (PUT action: publish) ---');
    const resPublish = await fetch(`${BASE_URL}/api/admin/pages/testcat/crud-test-item`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: updatedDraft, action: 'publish' })
    });
    assert(resPublish.status === 200, `PUT publish returned status ${resPublish.status}`);
    const dataPublish = await resPublish.json();
    assert(dataPublish.success === true, 'Publish response success is true');
    assert(dataPublish.page?.isPublished === true, 'Page is marked published');
    assert(dataPublish.page?.hasUnpublishedChanges === false, 'No unpublished changes after publish');

    // 7. UNPUBLISH Page
    console.log('\n--- 7. Testing UNPUBLISH (PUT action: unpublish) ---');
    const resUnpublish = await fetch(`${BASE_URL}/api/admin/pages/testcat/crud-test-item`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unpublish' })
    });
    assert(resUnpublish.status === 200, `PUT unpublish returned status ${resUnpublish.status}`);
    const dataUnpublish = await resUnpublish.json();
    assert(dataUnpublish.page?.isPublished === false, 'Page is marked unpublished');

    // 8. DELETE Page
    console.log('\n--- 8. Testing DELETE (/api/admin/pages/testcat/crud-test-item) ---');
    const resDelete = await fetch(`${BASE_URL}/api/admin/pages/testcat/crud-test-item`, {
      method: 'DELETE'
    });
    assert(resDelete.status === 200, `DELETE returned status ${resDelete.status}`);
    const dataDelete = await resDelete.json();
    assert(dataDelete.success === true, 'Delete response success is true');

    // 9. VERIFY 404 after deletion
    console.log('\n--- 9. Verifying 404 after DELETE ---');
    const resGetDeleted = await fetch(`${BASE_URL}/api/admin/pages/testcat/crud-test-item`);
    assert(resGetDeleted.status === 404, `GET deleted page correctly returned 404 Not Found`);

    // 10. INSIGHTS CRUD
    console.log('\n--- 10. Testing Admin Insights CRUD ---');
    const resInsights = await fetch(`${BASE_URL}/api/admin/insights`);
    assert(resInsights.status === 200, `GET /api/admin/insights returned status ${resInsights.status}`);
    const dataInsights = await resInsights.json();
    assert(dataInsights.success === true, 'Insights list success is true');
    assert(Array.isArray(dataInsights.items), `Found ${dataInsights.items?.length} insight items`);

    // CREATE Insight
    console.log('\n--- 11. Testing CREATE Insight ---');
    const resCreateInsight = await fetch(`${BASE_URL}/api/admin/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Automated CRUD Test Article',
        category: 'blogs',
        summary: 'Brief overview for automated testing',
        content: 'Full rich markdown content for automated testing...',
        author: 'QA Automation',
        badge: 'AUTOMATED TEST'
      })
    });
    assert(resCreateInsight.status === 200, `POST insight returned status ${resCreateInsight.status}`);
    const dataCreateInsight = await resCreateInsight.json();
    assert(dataCreateInsight.success === true, 'Create insight success is true');
    const createdId = dataCreateInsight.item?.id;
    assert(Boolean(createdId), `Created insight ID: ${createdId}`);

    if (createdId) {
      // READ single insight
      console.log('\n--- 12. Testing READ Insight by ID ---');
      const resGetInsight = await fetch(`${BASE_URL}/api/admin/insights/${createdId}`);
      assert(resGetInsight.status === 200, `GET insight returned status ${resGetInsight.status}`);
      const dataGetInsight = await resGetInsight.json();
      assert(dataGetInsight.item?.title === 'Automated CRUD Test Article', 'Insight title matches');

      // UPDATE insight
      console.log('\n--- 13. Testing UPDATE Insight ---');
      const resUpdateInsight = await fetch(`${BASE_URL}/api/admin/insights/${createdId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dataGetInsight.item,
          title: 'Automated CRUD Test Article - Updated'
        })
      });
      assert(resUpdateInsight.status === 200, `PUT update insight returned status ${resUpdateInsight.status}`);
      const dataUpdateInsight = await resUpdateInsight.json();
      assert(dataUpdateInsight.item?.title === 'Automated CRUD Test Article - Updated', 'Updated title reflected');

      // DELETE insight
      console.log('\n--- 14. Testing DELETE Insight ---');
      const resDelInsight = await fetch(`${BASE_URL}/api/admin/insights/${createdId}`, {
        method: 'DELETE'
      });
      assert(resDelInsight.status === 200, `DELETE insight returned status ${resDelInsight.status}`);

      // Verify 404 after deletion
      const resGetDelInsight = await fetch(`${BASE_URL}/api/admin/insights/${createdId}`);
      assert(resGetDelInsight.status === 404, `GET deleted insight returned 404 Not Found`);
    }

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  }

  console.log('\n=========================================');
  console.log(`TOTAL RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=========================================');

  if (failed > 0) {
    process.exit(1);
  }
}

run();
