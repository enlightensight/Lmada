import { NextResponse } from 'next/server';
import { getAllStoredInsightList, deleteStoredInsight, saveStoredInsight } from '@/lib/insightsStorage';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const allItems = getAllStoredInsightList();
    const item = allItems.find((i) => i.id === id || i.slug === id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Insight not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch insight' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const allItems = getAllStoredInsightList();
    const existing = allItems.find((i) => i.id === id || i.slug === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Insight not found' },
        { status: 404 }
      );
    }

    const updatedItem = {
      ...existing,
      ...body,
      id: existing.id, // Preserve ID
    };

    const result = saveStoredInsight(updatedItem);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to update insight' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Insight updated successfully',
      item: result.item,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update insight' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteStoredInsight(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Insight not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Insight ${id} deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete insight' },
      { status: 500 }
    );
  }
}
